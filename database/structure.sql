-- Crear base de datos
CREATE DATABASE books_libreria;

-- Usar la base de datos creada
USE books_libreria;

-- Crear tabla roles
CREATE TABLE roles(
    idRole INT NOT NULL AUTO_INCREMENT,
    nameRole VARCHAR(20) NOT NULL,
    PRIMARY KEY(idRole)
);

-- Crear tabla usuarios
CREATE TABLE users(
    email VARCHAR(50) NOT NULL,
    names VARCHAR(50) NOT NULL,
    surnames VARCHAR(50) NOT NULL,
    city VARCHAR(20) NOT NULL,
    cellphone VARCHAR(15) NOT NULL,
    pass VARCHAR(70) NOT NULL,
    confirmPass VARCHAR(70) NOT NULL,
    acceptCondition CHAR(5),
    idRole int,
    avatar VARCHAR(100),
    PRIMARY KEY(email),
    FOREIGN KEY (idRole) REFERENCES roles(idRole)
);

-- Crear tabla autores
CREATE TABLE authors(
    idAuthor INT NOT NULL AUTO_INCREMENT,
    nameAuthor VARCHAR(30) NOT NULL,
    surnameAuthor VARCHAR(30) NOT NULL,
    PRIMARY KEY(idAuthor)
);

-- Crear tabla formato de los libros
CREATE TABLE formats(
    idFormat INT NOT NULL AUTO_INCREMENT,
    nameFormat VARCHAR(30) NOT NULL,
    PRIMARY KEY(idFormat)
);

-- Crear tabla categorias de los libros
CREATE TABLE categorys(
    idCategory INT NOT NULL AUTO_INCREMENT,
    nameCategory VARCHAR(30) NOT NULL,
    PRIMARY KEY(idCategory)
);

-- Crear tabla productos
CREATE TABLE products(
    sku VARCHAR(30) NOT NULL,
    nameBook VARCHAR(50) NOT NULL,
    idAuthor INT NOT NULL,
    price DOUBLE NOT NULL,
    publisher VARCHAR(30) NOT NULL,
    idFormat INT NOT NULL,
    idCategory INT NOT NULL,
    languageBook VARCHAR(20) NOT NULL,
    editionBook CHAR(10) NOT NULL,
    pages VARCHAR(30) NOT NULL,
    chapters VARCHAR(30) NOT NULL,
    imageProduct VARCHAR(50) NOT NULL,
    descriptionBook VARCHAR(100) NOT NULL,
    PRIMARY KEY(sku),
    FOREIGN KEY (idAuthor) REFERENCES authors(idAuthor),
    FOREIGN KEY (idFormat) REFERENCES formats(idFormat),
    FOREIGN KEY (idCategory) REFERENCES categorys(idCategory)
);

-- Crear tabla Detalles de la orden
CREATE TABLE orders(
    idOrder INT NOT NULL AUTO_INCREMENT,
    numberOrder VARCHAR(20) NOT NULL,
    idUser VARCHAR(50) NOT NULL,
    PRIMARY KEY(idOrder),
    FOREIGN KEY (idUser) REFERENCES users(email)
);

-- Crear tabla Detalles de la orden
CREATE TABLE details_order(
    idDetails INT NOT NULL AUTO_INCREMENT,
    idProduct VARCHAR(30) NOT NULL,
    idOrder INT NOT NULL,
    PRIMARY KEY(idDetails),
    FOREIGN KEY (idProduct) REFERENCES products(sku),
    FOREIGN KEY (idOrder) REFERENCES orders(idOrder)
);