-- Consultas con join

-- Total vendido por plataforma
SELECT 
pl.nombre AS plataforma,
SUM(dv.subtotal) AS total_vendido
FROM detalle_venta dv
JOIN producto p ON dv.id_producto = p.id_producto
JOIN plataforma pl ON p.id_plataforma = pl.id_plataforma
GROUP BY pl.nombre
ORDER BY total_vendido DESC;

-- Cliente que más ha comprado
SELECT 
c.id_cliente,
c.nombre,
SUM(v.total) AS total_consumido
FROM venta v
JOIN cliente c ON v.id_cliente = c.id_cliente
GROUP BY c.id_cliente, c.nombre
ORDER BY total_consumido DESC
LIMIT 1;

-- Empleado con más ventas
SELECT 
e.id_empleado,
e.nombre,
COUNT(v.id_venta) AS cantidad_ventas
FROM venta v
JOIN empleado e ON v.id_empleado = e.id_empleado
GROUP BY e.id_empleado, e.nombre
ORDER BY cantidad_ventas DESC
LIMIT 1;

-- Consultas con GROUP BY, HAVING y funciones de agregacion

-- Productos con más unidades vendidas
SELECT 
p.nombre,
COUNT(dv.id_producto) AS veces_vendido
FROM detalle_venta dv
JOIN producto p ON dv.id_producto = p.id_producto
GROUP BY p.nombre
HAVING COUNT(dv.id_producto) > 2
ORDER BY veces_vendido DESC;

-- Consulta con CTE (with) 

-- productos con mas ingresos
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
LIMIT 5;

-- Vista de inventario actual
CREATE VIEW v_inventario AS
SELECT 
p.id_producto,
p.nombre,
p.stock,
c.nombre AS categoria,
pl.nombre AS plataforma
FROM producto p
JOIN categoria c ON p.id_categoria = c.id_categoria
LEFT JOIN plataforma pl ON p.id_plataforma = pl.id_plataforma;

SELECT * FROM v_inventario;

-- Transaccion con rollback
BEGIN;

-- Ver productos con stock bajo
SELECT id_producto, stock
FROM producto
WHERE stock < 10;

-- Reabastecer automaticamente
UPDATE producto
SET stock = stock + 20
WHERE id_producto IN (
    SELECT id_producto
    FROM producto
    WHERE stock < 10
);

-- Ver productos con stock actualizado
SELECT id_producto, stock
FROM producto
WHERE stock >= 10;

COMMIT;
