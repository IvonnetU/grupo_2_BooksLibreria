// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

let adminController = {
  index: function(req,res){
    return res.render('./admin/manageProducts');
  },
  add: function(req,res){
    return res.render('./admin/addProduct');
  },
  edit: function(req,res){
    return res.render('./admin/editProduct');
  },
  delete: function(req,res){
    return res.render('./admin/deleteProduct');
  },
}

module.exports = adminController;