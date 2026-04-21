BEGIN;

-- categoria
INSERT INTO categoria (id_categoria, nombre, descripcion) VALUES
(1,'Categoria 1','Desc'),(2,'Categoria 2','Desc'),(3,'Categoria 3','Desc'),
(4,'Categoria 4','Desc'),(5,'Categoria 5','Desc'),(6,'Categoria 6','Desc'),
(7,'Categoria 7','Desc'),(8,'Categoria 8','Desc'),(9,'Categoria 9','Desc'),
(10,'Categoria 10','Desc'),(11,'Categoria 11','Desc'),(12,'Categoria 12','Desc'),
(13,'Categoria 13','Desc'),(14,'Categoria 14','Desc'),(15,'Categoria 15','Desc'),
(16,'Categoria 16','Desc'),(17,'Categoria 17','Desc'),(18,'Categoria 18','Desc'),
(19,'Categoria 19','Desc'),(20,'Categoria 20','Desc'),(21,'Categoria 21','Desc'),
(22,'Categoria 22','Desc'),(23,'Categoria 23','Desc'),(24,'Categoria 24','Desc'),
(25,'Categoria 25','Desc');

-- plataforma
INSERT INTO plataforma (id_plataforma, nombre) VALUES
(1,'PS5'),(2,'Xbox'),(3,'Switch'),(4,'PC'),(5,'PS4'),
(6,'Xbox One'),(7,'Mobile'),(8,'VR'),(9,'Arcade'),(10,'Cloud'),
(11,'P11'),(12,'P12'),(13,'P13'),(14,'P14'),(15,'P15'),
(16,'P16'),(17,'P17'),(18,'P18'),(19,'P19'),(20,'P20'),
(21,'P21'),(22,'P22'),(23,'P23'),(24,'P24'),(25,'P25');

-- proveedor
INSERT INTO proveedor (id_proveedor, nombre, telefono, email, direccion) VALUES
(1,'Prov1','1','p1@mail.com','Dir1'),(2,'Prov2','2','p2@mail.com','Dir2'),
(3,'Prov3','3','p3@mail.com','Dir3'),(4,'Prov4','4','p4@mail.com','Dir4'),
(5,'Prov5','5','p5@mail.com','Dir5'),(6,'Prov6','6','p6@mail.com','Dir6'),
(7,'Prov7','7','p7@mail.com','Dir7'),(8,'Prov8','8','p8@mail.com','Dir8'),
(9,'Prov9','9','p9@mail.com','Dir9'),(10,'Prov10','10','p10@mail.com','Dir10'),
(11,'Prov11','11','p11@mail.com','Dir11'),(12,'Prov12','12','p12@mail.com','Dir12'),
(13,'Prov13','13','p13@mail.com','Dir13'),(14,'Prov14','14','p14@mail.com','Dir14'),
(15,'Prov15','15','p15@mail.com','Dir15'),(16,'Prov16','16','p16@mail.com','Dir16'),
(17,'Prov17','17','p17@mail.com','Dir17'),(18,'Prov18','18','p18@mail.com','Dir18'),
(19,'Prov19','19','p19@mail.com','Dir19'),(20,'Prov20','20','p20@mail.com','Dir20'),
(21,'Prov21','21','p21@mail.com','Dir21'),(22,'Prov22','22','p22@mail.com','Dir22'),
(23,'Prov23','23','p23@mail.com','Dir23'),(24,'Prov24','24','p24@mail.com','Dir24'),
(25,'Prov25','25','p25@mail.com','Dir25');

-- cliente
INSERT INTO cliente (id_cliente, nombre, telefono, email) VALUES
(1,'C1','1','c1@mail.com'),(2,'C2','2','c2@mail.com'),(3,'C3','3','c3@mail.com'),
(4,'C4','4','c4@mail.com'),(5,'C5','5','c5@mail.com'),(6,'C6','6','c6@mail.com'),
(7,'C7','7','c7@mail.com'),(8,'C8','8','c8@mail.com'),(9,'C9','9','c9@mail.com'),
(10,'C10','10','c10@mail.com'),(11,'C11','11','c11@mail.com'),(12,'C12','12','c12@mail.com'),
(13,'C13','13','c13@mail.com'),(14,'C14','14','c14@mail.com'),(15,'C15','15','c15@mail.com'),
(16,'C16','16','c16@mail.com'),(17,'C17','17','c17@mail.com'),(18,'C18','18','c18@mail.com'),
(19,'C19','19','c19@mail.com'),(20,'C20','20','c20@mail.com'),(21,'C21','21','c21@mail.com'),
(22,'C22','22','c22@mail.com'),(23,'C23','23','c23@mail.com'),(24,'C24','24','c24@mail.com'),
(25,'C25','25','c25@mail.com');

-- empleado
INSERT INTO empleado (id_empleado, nombre, puesto, salario) VALUES
(1,'E1','Vendedor',700),(2,'E2','Vendedor',710),(3,'E3','Vendedor',720),
(4,'E4','Vendedor',730),(5,'E5','Vendedor',740),(6,'E6','Vendedor',750),
(7,'E7','Vendedor',760),(8,'E8','Vendedor',770),(9,'E9','Vendedor',780),
(10,'E10','Vendedor',790),(11,'E11','Vendedor',800),(12,'E12','Vendedor',810),
(13,'E13','Vendedor',820),(14,'E14','Vendedor',830),(15,'E15','Vendedor',840),
(16,'E16','Vendedor',850),(17,'E17','Vendedor',860),(18,'E18','Vendedor',870),
(19,'E19','Vendedor',880),(20,'E20','Vendedor',890),(21,'E21','Vendedor',900),
(22,'E22','Vendedor',910),(23,'E23','Vendedor',920),(24,'E24','Vendedor',930),
(25,'E25','Vendedor',940);

-- producto
INSERT INTO producto (id_producto, nombre, descripcion, precio, stock, id_categoria, id_plataforma) VALUES
(1,'Prod1','D',10,5,1,1),(2,'Prod2','D',12,6,2,2),(3,'Prod3','D',14,7,3,3),
(4,'Prod4','D',16,8,4,4),(5,'Prod5','D',18,9,5,5),(6,'Prod6','D',20,10,6,6),
(7,'Prod7','D',22,11,7,7),(8,'Prod8','D',24,12,8,8),(9,'Prod9','D',26,13,9,9),
(10,'Prod10','D',28,14,10,10),(11,'Prod11','D',30,15,11,11),(12,'Prod12','D',32,16,12,12),
(13,'Prod13','D',34,17,13,13),(14,'Prod14','D',36,18,14,14),(15,'Prod15','D',38,19,15,15),
(16,'Prod16','D',40,20,16,16),(17,'Prod17','D',42,21,17,17),(18,'Prod18','D',44,22,18,18),
(19,'Prod19','D',46,23,19,19),(20,'Prod20','D',48,24,20,20),(21,'Prod21','D',50,25,21,21),
(22,'Prod22','D',52,26,22,22),(23,'Prod23','D',54,27,23,23),(24,'Prod24','D',56,28,24,24),
(25,'Prod25','D',58,29,25,25);

-- producto_proveedor
INSERT INTO producto_proveedor (id_producto, id_proveedor, precio_compra) VALUES
(1,1,5),(2,2,6),(3,3,7),(4,4,8),(5,5,9),
(6,6,10),(7,7,11),(8,8,12),(9,9,13),(10,10,14),
(11,11,15),(12,12,16),(13,13,17),(14,14,18),(15,15,19),
(16,16,20),(17,17,21),(18,18,22),(19,19,23),(20,20,24),
(21,21,25),(22,22,26),(23,23,27),(24,24,28),(25,25,29);

-- venta
INSERT INTO venta (id_venta, fecha, total, id_cliente, id_empleado) VALUES
(1,NOW(),100,1,1),(2,NOW(),110,2,2),(3,NOW(),120,3,3),
(4,NOW(),130,4,4),(5,NOW(),140,5,5),(6,NOW(),150,6,6),
(7,NOW(),160,7,7),(8,NOW(),170,8,8),(9,NOW(),180,9,9),
(10,NOW(),190,10,10),(11,NOW(),200,11,11),(12,NOW(),210,12,12),
(13,NOW(),220,13,13),(14,NOW(),230,14,14),(15,NOW(),240,15,15),
(16,NOW(),250,16,16),(17,NOW(),260,17,17),(18,NOW(),270,18,18),
(19,NOW(),280,19,19),(20,NOW(),290,20,20),(21,NOW(),300,21,21),
(22,NOW(),310,22,22),(23,NOW(),320,23,23),(24,NOW(),330,24,24),
(25,NOW(),340,25,25);

-- detalle_venta (25)
INSERT INTO detalle_venta (id_detalle, id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1,1,1,1,10,10),(2,2,2,1,12,12),(3,3,3,1,14,14),
(4,4,4,1,16,16),(5,5,5,1,18,18),(6,6,6,1,20,20),
(7,7,7,1,22,22),(8,8,8,1,24,24),(9,9,9,1,26,26),
(10,10,10,1,28,28),(11,11,11,1,30,30),(12,12,12,1,32,32),
(13,13,13,1,34,34),(14,14,14,1,36,36),(15,15,15,1,38,38),
(16,16,16,1,40,40),(17,17,17,1,42,42),(18,18,18,1,44,44),
(19,19,19,1,46,46),(20,20,20,1,48,48),(21,21,21,1,50,50),
(22,22,22,1,52,52),(23,23,23,1,54,54),(24,24,24,1,56,56),
(25,25,25,1,58,58);

COMMIT;