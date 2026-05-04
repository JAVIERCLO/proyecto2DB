import express from 'express';
import { pool } from '../conexionDB.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        res.json({
            ok: true,
            productos: result.rows
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'error al obtener productos'
        });
    }
});

// Obtener producto por id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'SELECT * FROM producto WHERE id_producto = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al obtener producto'
        });
    }
});

// Crear producto
router.post('/', async (req, res) => {
    try {
        const { nombre, precio, stock, id_categoria, id_plataforma } = req.body;

        // Validación de campos obligatorios
        if (!nombre || !precio || stock === undefined || !id_categoria) {
            return res.status(400).json({
                ok: false,
                error: 'faltan campos obligatorios'
            });
        }

        const result = await pool.query(
            `INSERT INTO producto (nombre, precio, stock, id_categoria, id_plataforma)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nombre, precio, stock, id_categoria, id_plataforma]
        );

        res.status(201).json({
            ok: true,
            producto: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al crear producto'
        });
    }
});

// Reemplazar producto completo
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, precio, stock, id_categoria, id_plataforma } = req.body;

        const result = await pool.query(
            `UPDATE producto
             SET nombre = $1, precio = $2, stock = $3, id_categoria = $4, id_plataforma = $5
             WHERE id_producto = $6 RETURNING *`,
            [nombre, precio, stock, id_categoria, id_plataforma, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al actualizar producto'
        });
    }
});

// Modificar algunos campos
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { stock } = req.body;

        const result = await pool.query(
            `UPDATE producto
             SET stock = $1
             WHERE id_producto = $2 RETURNING *`,
            [stock, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al modificar producto'
        });
    }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Verificar si el producto tiene ventas
        const check = await pool.query(
            'SELECT * FROM detalle_venta WHERE id_producto = $1',
            [id]
        );

        if (check.rows.length > 0) {
            return res.status(400).json({
                ok: false,
                error: 'no se puede eliminar, producto con historial de ventas'
            });
        }

        await pool.query(
            'DELETE FROM producto_proveedor WHERE id_producto = $1',
            [id]
        );

        const result = await pool.query(
            'DELETE FROM producto WHERE id_producto = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'producto no encontrado'
            });
        }

        res.json({
            ok: true,
            mensaje: 'producto eliminado correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al eliminar producto'
        });
    }
});

export default router;