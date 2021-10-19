// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// Asignando el servidor
app.listen(3030, () => {
    console.log("Servidor ejecutandose en el puerto 3000");
});

// Declarando la ruta del archivo inicio
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

// Declarando la ruta del archivo detalle del producto
app.get('/detalle-producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
});

// Declarando la ruta del archivo carrito de compras
app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});

// Declarando la ruta del archivo registro
app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

// Declarando la ruta del archivo login
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

