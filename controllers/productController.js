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

// base de datos 
const db = require("../database/models");

let productController = {  
  // Root - Show all products
  list: (req, res) => {
    db.Productos.findAll().then((products) => {
      res.render('./products/productList',{ dataBooks: products });
    })
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let idProduct = req.params.id;

    db.Productos.findByPk(idProduct,{
      include: [{association:"autores"},{association:"formatos"},{association:"categorias"}]
    }).then((product) => {
      res.render('./products/productDetail',{product});
    })
    
  },
  // Car - show buy
  car: (req, res) => {
    res.render('./products/productCart');
  }
 
}

module.exports = productController;