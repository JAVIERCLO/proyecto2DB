import 'dotenv/config';
import express from 'express';
import { pool } from './conexionDB.js';

const app = express();
const port = 3000;

app.use(express.json());

// prueba conexión
(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Base de datos conectada: ', result.rows[0]);
    } catch (error) {
        console.error('Error de conexión', error);
    }
})();

// endpoint de prueba
app.get('/', (req, res) => {
    res.send('prueba de backend');
});

// iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});