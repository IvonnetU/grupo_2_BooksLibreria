// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

let usersController = {
  
  login: function(req,res){
    return res.render('./users/login');
  },
  register: function(req,res){
    return res.render('./users/register');
  },
}

module.exports = usersController;