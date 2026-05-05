import express from 'express';
import { pool } from '../conexionDB.js';

const router = express.Router();

// Total vendido por plataforma
router.get('/plataformas', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                pl.nombre AS plataforma,
                SUM(dv.subtotal) AS total_vendido
            FROM detalle_venta dv
            JOIN producto p ON dv.id_producto = p.id_producto
            JOIN plataforma pl ON p.id_plataforma = pl.id_plataforma
            GROUP BY pl.nombre
            ORDER BY total_vendido DESC
        `);

        res.json({
            ok: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

// Cliente que más ha comprado
router.get('/top-cliente', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.id_cliente,
                c.nombre,
                SUM(v.total) AS total_consumido
            FROM venta v
            JOIN cliente c ON v.id_cliente = c.id_cliente
            GROUP BY c.id_cliente, c.nombre
            ORDER BY total_consumido DESC
            LIMIT 1
        `);

        res.json({
            ok: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

// empleado con más ventas
router.get('/top-empleado', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.id_empleado,
                e.nombre,
                COUNT(v.id_venta) AS cantidad_ventas
            FROM venta v
            JOIN empleado e ON v.id_empleado = e.id_empleado
            GROUP BY e.id_empleado, e.nombre
            ORDER BY cantidad_ventas DESC
            LIMIT 1
        `);

        res.json({
            ok: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

// Consulta con GROUP BY, HAVING y funciones de agregación
// productos con más unidades vendidas
router.get('/productos-mas-vendidos', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.nombre,
                SUM(dv.cantidad) AS total_vendido
            FROM detalle_venta dv
            JOIN producto p ON dv.id_producto = p.id_producto
            GROUP BY p.nombre
            HAVING SUM(dv.cantidad) > 2
            ORDER BY total_vendido DESC
        `);

        res.json({
            ok: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

// consulta con CTE (with)
// productos con más ingresos
router.get('/productos-con-mas-ingresos', async (req, res) => {
    try {
        const result = await pool.query(`
            WITH ventas_producto AS (
                SELECT 
                    p.id_producto,
                    p.nombre,
                    SUM(dv.subtotal) AS total_ingresos
                FROM detalle_venta dv
                JOIN producto p ON dv.id_producto = p.id_producto
                GROUP BY p.id_producto, p.nombre
            )
            SELECT 
                nombre,
                total_ingresos
            FROM ventas_producto
            ORDER BY total_ingresos DESC
            LIMIT 5
        `);

        res.json({
            ok: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

// vista de inventario actual
router.get('/inventario', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM v_inventario
        `);

        res.json({
            ok: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al acceder a los datos'
        });
    }
});

async function cargarPlataformas() {
    const res = await fetch('/api/reportes/plataformas');
    const data = await res.json();
    renderTabla(data.data);
}

async function topCliente() {
    const res = await fetch('/api/reportes/top-cliente');
    const data = await res.json();
    renderTabla([data.data]);
}

async function topEmpleado() {
    const res = await fetch('/api/reportes/top-empleado');
    const data = await res.json();
    renderTabla([data.data]);
}

async function productosVendidos() {
    const res = await fetch('/api/reportes/productos-mas-vendidos');
    const data = await res.json();
    window.dataCSV = data.data;
    renderTabla(data.data);
}

async function productosIngresos() {
    const res = await fetch('/api/reportes/productos-con-mas-ingresos');
    const data = await res.json();
    renderTabla(data.data);
}

async function inventario() {
    const res = await fetch('/api/reportes/inventario');
    const data = await res.json();
    renderTabla(data.data);
}

export default router;