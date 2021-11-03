// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

let productController = {
  detail: (req, res) => {
    return res.render('./products/productDetail');
  },
  car: (req, res) => {
    return res.render('./products/productCart');
  },
}

module.exports = productController;