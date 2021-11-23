// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

let productController = {  
  list: (req, res) => {
    res.render('./products/productList');
  },
  detail: (req, res) => {
    res.render('./products/productDetail');
  },
  car: (req, res) => {
    res.render('./products/productCart');
  },
  create:(req, res) => {
    res.render('./admin/addProduct');
  },
  store:(req, res) => {
    res.render('./admin/productList');
  },
  edit:(req, res) => {
    res.render('./admin/editProduct');
  },
  update: (req, res) => {
    res.render('./products/productDetail');
  },
  destroy: (req, res) => {
    res.render('./products/deleteProduct');
  },
}

module.exports = productController;