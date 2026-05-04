import 'dotenv/config';
import express from 'express';
import { pool } from './conexionDB.js';
import productosRoutes from './api/productos.js';
import reportesRoutes from './api/reportes.js';

const app = express();
const port = 3000;

app.use(express.json());

// rutas
app.use('/api/productos', productosRoutes);
app.use('/api/reportes', reportesRoutes);

// endpoint de documentación
app.get('/', (req, res) => {
    res.send(`
    <h1>API Proyecto BD</h1>
    <p>Endpoints disponibles:</p>
    <ul>
        <li>GET /api/productos</li>
        <li>GET /api/productos/:id</li>
        <li>POST /api/productos</li>
        <li>PUT /api/productos/:id</li>
        <li>PATCH /api/productos/:id</li>
        <li>DELETE /api/productos/:id</li>
        <li>GET /api/status</li>
    </ul>
    `);
});

// endpoint de status de la api
app.get('/api/status', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Servidor activo',
        timestamp: new Date().toISOString()
    });
});

// prueba de conexion
(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada:', result.rows[0]);
    } catch (error) {
        console.error('Error de conexión:', error);
    }
})();

// manejo de errores
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        error: 'Endpoint no encontrado'
    });
});

// iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});