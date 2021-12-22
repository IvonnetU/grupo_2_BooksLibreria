// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// //conectando json
// const usersFilePath = path.join(__dirname, '../data/users.json');
// const products = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
  
  login: function(req,res){
    res.render('./users/login');
  },
  register: function(req,res){
    res.render('./users/register');
  },
  create: function(req,res){
    res.render('./users/register');
  }
}

module.exports = usersController;