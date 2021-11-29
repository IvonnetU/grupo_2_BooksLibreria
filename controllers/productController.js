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
  // Root - Show all products
  list: (req, res) => {
    res.render('./products/productList',{ dataBooks: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let idProduct = req.params.id;
    product = products.find(function(item){
      return item.id === idProduct;
    });
    res.render('./products/productDetail',{product});
  },
  // Car - show buy
  car: (req, res) => {
    res.render('./products/productCart');
  }

 
}

module.exports = productController;