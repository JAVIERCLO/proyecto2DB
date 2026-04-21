BEGIN;

-- =========================
-- CATEGORIA
-- =========================
CREATE TABLE categoria (
    id_categoria SERIAL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    CONSTRAINT pk_categoria PRIMARY KEY (id_categoria)
);

-- =========================
-- PLATAFORMA
-- =========================
CREATE TABLE plataforma (
    id_plataforma SERIAL,
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT pk_plataforma PRIMARY KEY (id_plataforma)
);

-- =========================
-- PRODUCTO
-- =========================
CREATE TABLE producto (
    id_producto SERIAL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    id_plataforma INT,

    CONSTRAINT pk_producto PRIMARY KEY (id_producto),

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria),

    CONSTRAINT fk_producto_plataforma
        FOREIGN KEY (id_plataforma)
        REFERENCES plataforma(id_plataforma)
);

-- =========================
-- PROVEEDOR
-- =========================
CREATE TABLE proveedor (
    id_proveedor SERIAL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(150),

    CONSTRAINT pk_proveedor PRIMARY KEY (id_proveedor)
);

-- =========================
-- PRODUCTO_PROVEEDOR
-- =========================
CREATE TABLE producto_proveedor (
    id_producto INT NOT NULL,
    id_proveedor INT NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,

    CONSTRAINT pk_producto_proveedor PRIMARY KEY (id_producto, id_proveedor),

    CONSTRAINT fk_pp_producto
        FOREIGN KEY (id_producto)
        REFERENCES producto(id_producto),

    CONSTRAINT fk_pp_proveedor
        FOREIGN KEY (id_proveedor)
        REFERENCES proveedor(id_proveedor)
);

-- =========================
-- CLIENTE
-- =========================
CREATE TABLE cliente (
    id_cliente SERIAL,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),

    CONSTRAINT pk_cliente PRIMARY KEY (id_cliente)
);

-- =========================
-- EMPLEADO
-- =========================
CREATE TABLE empleado (
    id_empleado SERIAL,
    nombre VARCHAR(50) NOT NULL,
    puesto VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,

    CONSTRAINT pk_empleado PRIMARY KEY (id_empleado)
);

-- =========================
-- VENTA
-- =========================
CREATE TABLE venta (
    id_venta SERIAL,
    fecha TIMESTAMP NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    id_cliente INT NOT NULL,
    id_empleado INT NOT NULL,

    CONSTRAINT pk_venta PRIMARY KEY (id_venta),

    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente),

    CONSTRAINT fk_venta_empleado
        FOREIGN KEY (id_empleado)
        REFERENCES empleado(id_empleado)
);

-- =========================
-- DETALLE_VENTA
-- =========================
CREATE TABLE detalle_venta (
    id_detalle SERIAL,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT pk_detalle_venta PRIMARY KEY (id_detalle),

    CONSTRAINT fk_detalle_venta_venta
        FOREIGN KEY (id_venta)
        REFERENCES venta(id_venta),

    CONSTRAINT fk_detalle_venta_producto
        FOREIGN KEY (id_producto)
        REFERENCES producto(id_producto)
);

-- =========================
-- ÍNDICES
-- =========================

-- Búsqueda de productos por nombre
CREATE INDEX idx_producto_nombre
ON producto(nombre);

-- Reportes por fecha de venta
CREATE INDEX idx_venta_fecha
ON venta(fecha);

-- Análisis de productos más vendidos
CREATE INDEX idx_detalle_producto
ON detalle_venta(id_producto);

-- Consultas por categoría
CREATE INDEX idx_producto_categoria
ON producto(id_categoria);

COMMIT;