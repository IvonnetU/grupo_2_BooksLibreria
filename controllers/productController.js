// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');
 const fs = require('fs');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//conectando json
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productController = {  
  list: (req, res) => {
    res.render('./products/productList',{ dataBooks: products });
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