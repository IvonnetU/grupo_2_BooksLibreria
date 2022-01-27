-- Insertar datos a la tabla roles
INSERT INTO roles VALUES
(DEFAULT, "user"),
(DEFAULT, "admin");

-- Datos de Usuarios
INSERT INTO users VALUES 
('ldumsday0@ameblo.jp','Laurice','Dumsday','Nam Đàn','306-973-8139','$2a$10$7ph.0N0HeTM.NjKg/RROP.iD1ZLJOF8j1ACWT9nCLNgehA/SGFHva','$2a$10$7ph.0N0HeTM.NjKg/RROP.iD1ZLJOF8j1ACWT9nCLNgehA/SGFHva','on',1,'etdoloredignissimos.png');

-- Insertar datos a la tabla autores
INSERT INTO authors VALUES
(DEFAULT, "Antoine de","Saint Exupery"),
(DEFAULT, "Jhon","Green");

-- Insertar datos a la tabla formato de libros
INSERT INTO formats VALUES
(DEFAULT, "Libro"),
(DEFAULT, "Ebooks");

-- Insertar datos a la tabla formato de libros
INSERT INTO categorys VALUES
(DEFAULT,"Literatura universal"),
(DEFAULT, "Historia universal"),
(DEFAULT, "Novela histórica"),
(DEFAULT, "Feminismo"),
(DEFAULT, "Young adult"),
(DEFAULT, "Novela Gráfica"),
(DEFAULT, "Acción"),
(DEFAULT, "Ficción"),
(DEFAULT, "Romántica"),
(DEFAULT, "Historia"),
(DEFAULT, "Suspenso y terror"),
(DEFAULT, "Policiaca"),
(DEFAULT, "Fantástica y ciencia ficción"),
(DEFAULT, "Juvenil"),
(DEFAULT, "Novela histórica");

-- Insertar datos a la tabla productos
INSERT INTO products VALUES
('9789589691113','El Principito',1,45000,'Edigrama',1,1,'Español','1','94','No especificado','book-el-principito.png','El Principito es un libro destinado a todos los adultos que ya han olvidado al niño que fueron y sigue durmiendo dentro de ellos. Y a todos los niños para que no pierdan su pureza, su espontaneidad y fidelidad a sus creencias. El Principito es una meditación serena sobre la soledad del hombre y sobre la amistad; el único elixir capaz de enriquecer la vida humana y restablecer las relaciones perdidas entre los hombres.');

-- Insertar datos a la tabla de ordenes
INSERT INTO orders VALUES
(DEFAULT, '123456','ldumsday0@ameblo.jp');


-- Insertar datos a la tabla de ordenes
INSERT INTO details_order VALUES
(DEFAULT, '9789589691113',1);