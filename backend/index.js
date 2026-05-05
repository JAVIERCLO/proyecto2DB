import 'dotenv/config';
import express from 'express';
import { pool } from './conexionDB.js';
import productosRoutes from './api/productos.js';
import reportesRoutes from './api/reportes.js';
import stockRoutes from './api/stock.js';
import clientesRoutes from './api/clientes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// rutas
app.use('/api/productos', productosRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/clientes', clientesRoutes);

// endpoint de documentación
app.get('/', (req, res) => {
    res.send(`
    <h1>API Proyecto 2 base de datos</h1>

    <h2>Productos</h2>
    <ul>
        <li>GET /api/productos</li>
        <li>GET /api/productos/:id</li>
        <li>POST /api/productos</li>
        <li>PUT /api/productos/:id</li>
        <li>PATCH /api/productos/:id</li>
        <li>DELETE /api/productos/:id</li>
    </ul>

    <h2>Clientes</h2>
    <ul>
        <li>GET /api/clientes</li>
        <li>GET /api/clientes/:id</li>
        <li>POST /api/clientes</li>
        <li>PATCH /api/clientes/:id</li>
        <li>DELETE /api/clientes/:id</li>
    </ul>

    <h2>Reportes</h2>
    <ul>
        <li>GET /api/reportes/plataformas</li>
        <li>GET /api/reportes/top-cliente</li>
        <li>GET /api/reportes/top-empleado</li>
        <li>GET /api/reportes/productos-vendidos</li>
        <li>GET /api/reportes/productos-ingresos</li>
        <li>GET /api/reportes/inventario</li>
    </ul>

    <h2>Stock</h2>
    <ul>
        <li>POST /api/stock/reabastecer</li>
    </ul>

    <h2>Otros</h2>
    <ul>
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