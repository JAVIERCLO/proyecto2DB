BEGIN;

-- categoria
INSERT INTO categoria (id_categoria, nombre, descripcion) VALUES
(1,'Consolas','Hardware de videojuegos'),
(2,'Videojuegos','Juegos para distintas plataformas'),
(3,'Accesorios','Periféricos de juego'),
(4,'Audio','Auriculares y sonido'),
(5,'Almacenamiento','Discos y memorias'),
(6,'PC Gaming','Componentes para PC'),
(7,'Realidad Virtual','Dispositivos VR'),
(8,'Controles','Mandos y joysticks'),
(9,'Suscripciones','Servicios digitales'),
(10,'Merchandising','Artículos de colección');

-- plataforma
INSERT INTO plataforma (id_plataforma, nombre) VALUES
(1,'PlayStation 5'),
(2,'Xbox Series X'),
(3,'Nintendo Switch'),
(4,'PC'),
(5,'PlayStation 4'),
(6,'Xbox One'),
(7,'Steam'),
(8,'Epic Games'),
(9,'Meta Quest'),
(10,'iOS'),
(11,'Android');

-- proveedor
INSERT INTO proveedor (id_proveedor, nombre, telefono, email, direccion) VALUES
(1,'Sony Interactive Entertainment','5551111','sony@sie.com','Tokyo, Japón'),
(2,'Microsoft Gaming','5552222','xbox@microsoft.com','Washington, USA'),
(3,'Nintendo Co., Ltd.','5553333','nintendo@nintendo.com','Kyoto, Japón'),
(4,'Electronic Arts','5554444','ea@ea.com','California, USA'),
(5,'Ubisoft','5555555','ubisoft@ubisoft.com','París, Francia'),
(6,'Valve Corporation','5556666','steam@valve.com','Washington, USA'),
(7,'Corsair Gaming','5557777','corsair@corsair.com','California, USA'),
(8,'Logitech','5558888','logitech@logitech.com','Suiza'),
(9,'Seagate','5559999','seagate@seagate.com','California, USA'),
(10,'Meta Platforms','5551010','meta@meta.com','California, USA');

-- cliente
INSERT INTO cliente (id_cliente, nombre, telefono, email) VALUES
(1,'Juan Pérez','3001111111','juan.perez@gmail.com'),
(2,'María González','3002222222','maria.g@gmail.com'),
(3,'Carlos Ramírez','3003333333','carlos.r@gmail.com'),
(4,'Laura Torres','3004444444','laura.t@gmail.com'),
(5,'Andrés López','3005555555','andres.l@gmail.com');

-- empleado
INSERT INTO empleado (id_empleado, nombre, puesto, salario) VALUES
(1,'Ana Martínez','Vendedor',900),
(2,'Luis Gómez','Cajero',850),
(3,'Sofía Herrera','Supervisor',1200),
(4,'Daniel Castro','Vendedor',880),
(5,'Valentina Ríos','Vendedor',870);

-- producto
INSERT INTO producto (id_producto, nombre, descripcion, precio, stock, id_categoria, id_plataforma) VALUES
(1,'PlayStation 5','Consola Sony última generación',499,15,1,1),
(2,'Xbox Series X','Consola Microsoft 4K',499,12,1,2),
(3,'Nintendo Switch OLED','Consola híbrida portátil',349,20,1,3),

(4,'God of War Ragnarok','Juego exclusivo PS5',69,25,2,1),
(5,'Halo Infinite','Shooter Xbox',59,30,2,2),
(6,'Zelda Breath of the Wild','Aventura Switch',59,40,2,3),

(7,'Control DualSense','Mando PS5',69,35,8,1),
(8,'Control Xbox Wireless','Mando Xbox',59,30,8,2),

(9,'Headset Logitech G Pro','Auriculares gaming',129,20,4,4),
(10,'SSD Seagate 1TB','Almacenamiento rápido',99,25,5,4),

(11,'Tarjeta gráfica RTX 4070','GPU gaming',599,10,6,4),

(12,'Meta Quest 2','Realidad virtual standalone',299,15,7,9),

(13,'Xbox Game Pass','Suscripción mensual',10,100,9,2),
(14,'PlayStation Plus','Suscripción mensual',10,100,9,1);

-- producto_proveedor
INSERT INTO producto_proveedor (id_producto, id_proveedor, precio_compra) VALUES
(1,1,450),
(2,2,440),
(3,3,300),
(4,1,50),
(5,2,45),
(6,3,45),
(7,1,50),
(8,2,45),
(9,8,100),
(10,9,80),
(11,7,500),
(12,10,250);

-- venta
INSERT INTO venta (id_venta, fecha, total, id_cliente, id_empleado) VALUES
(101, NOW(), 568, 1, 1),
(102, NOW(), 118, 2, 2),
(103, NOW(), 408, 3, 1),
(104, NOW(), 228, 4, 3),
(105, NOW(), 678, 5, 2),
(106, NOW(), 598, 1, 4),
(107, NOW(), 187, 2, 5),
(108, NOW(), 299, 3, 3),
(109, NOW(), 138, 4, 2),
(110, NOW(), 99, 5, 1);

-- detalle_venta
INSERT INTO detalle_venta (id_detalle, id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES
-- Venta 101
(101,101,1,1,499,499),
(102,101,7,1,69,69),

-- Venta 102
(103,102,5,1,59,59),
(104,102,8,1,59,59),

-- Venta 103
(105,103,3,1,349,349),
(106,103,6,1,59,59),

-- Venta 104
(107,104,9,1,129,129),
(108,104,10,1,99,99),

-- Venta 105
(109,105,11,1,599,599),
(110,105,13,1,10,10),
(111,105,14,1,10,10),
(112,105,5,1,59,59),

-- Venta 106
(113,106,2,1,499,499),
(114,106,8,1,59,59),
(115,106,13,1,10,10),
(116,106,14,3,10,30),

-- Venta 107
(117,107,4,1,69,69),
(118,107,5,2,59,118),

-- Venta 108
(119,108,12,1,299,299),

-- Venta 109
(120,109,7,2,69,138),

-- Venta 110
(121,110,10,1,99,99);

COMMIT;