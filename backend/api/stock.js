import express from 'express';
import { pool } from '../conexionDB.js';

const router = express.Router();


// Transacción con rollback
// Reabastecer productos con stock bajo
router.post('/reabastecer', async (req, res) => {
    try {
        await pool.query('BEGIN');

        // Ver productos con stock bajo
        const bajos = await pool.query(`
            SELECT id_producto, nombre, stock
            FROM producto
            WHERE stock < 10
        `);

        // reabastecer automáticamente
        await pool.query(`
            UPDATE producto
            SET stock = stock + 20
            WHERE id_producto IN (
                SELECT id_producto
                FROM producto
                WHERE stock < 10
            )
        `);

        await pool.query('COMMIT');

        res.json({
            ok: true,
            mensaje: 'stock actualizado correctamente',
            productos_afectados: bajos.rows
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error);
        res.status(500).json({
            ok: false,
            error: 'error al reabastecer stock'
        });
    }
});

async function reabastecer() {
    const res = await fetch('/api/stock/reabastecer', {
        method: 'POST'
    });

    const data = await res.json();

    document.getElementById('resultadoStock').textContent =
        JSON.stringify(data, null, 2);
}

export default router;