# Proyecto Base de Datos

API REST + PostgreSQL + Docker para gestión de productos, clientes y reportes.

---

## Instrucciones para ejecutar el proyecto

```bash
git clone https://github.com/JAVIERCLO/proyecto2DB
docker compose up --build
http://localhost:3000
```
---

Endpoints principales
Productos
GET /api/productos
POST /api/productos
PUT /api/productos/:id
PATCH /api/productos/:id
DELETE /api/productos/:id
Clientes
GET /api/clientes
POST /api/clientes
PATCH /api/clientes/:id
DELETE /api/clientes/:id
Reportes
GET /api/reportes/plataformas
GET /api/reportes/top-cliente
GET /api/reportes/top-empleado
GET /api/reportes/productos-vendidos
GET /api/reportes/productos-ingresos
GET /api/reportes/inventario
Stock
POST /api/stock/reabastecer