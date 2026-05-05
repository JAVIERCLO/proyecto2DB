import express from 'express';
import { pool } from '../conexionDB.js';

const router = express.Router();


// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');

        res.json({
            ok: true,
            clientes: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al obtener clientes'
        });
    }
});


// Obtener cliente por id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'SELECT * FROM cliente WHERE id_cliente = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'cliente no encontrado'
            });
        }

        res.json({
            ok: true,
            cliente: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al obtener cliente'
        });
    }
});


// Crear cliente
router.post('/', async (req, res) => {
    try {
        const { nombre, telefono, email } = req.body;

        if (!nombre || !telefono || !email) {
            return res.status(400).json({
                ok: false,
                error: 'faltan campos obligatorios'
            });
        }

        const result = await pool.query(
            `INSERT INTO cliente (nombre, telefono, email)
             VALUES ($1, $2, $3) RETURNING *`,
            [nombre, telefono, email]
        );

        res.status(201).json({
            ok: true,
            cliente: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al crear cliente'
        });
    }
});

// Modificar cliente
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            'SELECT * FROM cliente WHERE id_cliente = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'cliente no encontrado'
            });
        }

        const clienteActual = result.rows[0];

        const clienteModificado = {
            nombre: req.body.nombre || clienteActual.nombre,
            telefono: req.body.telefono || clienteActual.telefono,
            email: req.body.email || clienteActual.email
        };

        // validación de campos vacíos
        if (
            clienteModificado.nombre.trim() === '' ||
            clienteModificado.telefono.trim() === '' ||
            clienteModificado.email.trim() === ''
        ) {
            return res.status(400).json({
                ok: false,
                error: 'los campos no pueden estar vacíos'
            });
        }

        const update = await pool.query(
            `UPDATE cliente
             SET nombre = $1, telefono = $2, email = $3
             WHERE id_cliente = $4 RETURNING *`,
            [
                clienteModificado.nombre,
                clienteModificado.telefono,
                clienteModificado.email,
                id
            ]
        );

        res.json({
            ok: true,
            cliente: update.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al modificar cliente'
        });
    }
});

export default router;