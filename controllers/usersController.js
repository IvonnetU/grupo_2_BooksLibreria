// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//conectando json
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
  
  login: function(req,res){
    res.render('./users/login');
  },
  register: function(req,res){
    res.render('./users/register');
  },
  create: function(req,res){
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
      const {name,lastname,email,phone,city,pass,confirmpass} = req.body;
      let idPrev = users.length;
      const dataNew = {
        id: idPrev + 1,
        name_user:name,
        last_name:lastname, 
        email,
        city,
        phone,
        password:pass,
        confirmpass,
        image: 'user-generic.png',
        role: 'user'     
      }
      users.push(dataNew);
      fs.writeFileSync(usersFilePath,JSON.stringify(users),'utf-8');
      res.redirect('/');
    }else{
      res.render('./users/register',{
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }				
  }
}

module.exports = usersController;