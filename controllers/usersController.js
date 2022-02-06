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
// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// base de datos 
const db = require("../database/models");

//Requerir modelo de usuarios
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

let usersController = {
  
  login: function(req,res){
    res.render('./users/login');
  },
  loginProcess: (req, res) => {
    let userToLogin = User.findByField('email', req.body.email);

    if(userToLogin){
      let isPassword = bcryptjs.compareSync(req.body.pass, userToLogin.password);
      if(isPassword){
        delete userToLogin.password;
        req.session.userLogged = userToLogin;   
        
        if(req.body.remember){
          res.cookie('userEmail', req.body.email,{maxAge: (1000 * 60) * 60})
        }

        return res.redirect('/users/profile');      

      }
      return res.render('./users/login', {
        errors:{
          email:{
            msg:'Las credenciales no son correctas'
          }
        }
      });
    }

    return res.render('./users/login', {
      errors:{
        email:{
          msg:'No se encuentra el usuario'
        }
      }
    });
  },
  register: function(req,res){
    res.render('./users/register');
  },
  create: function(req,res){
    let resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
      return res.render('./users/register',{
        errors: resultValidation.mapped(),
        oldData: req.body
      });      
    }	

    let userInDB = User.findByField('email', req.body.email);

    if(userInDB){
      return res.render('./users/register',{
        errors: {
          email:{
            msg: 'Este email ya está registrado'
          }
        },
        oldData: req.body
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.pass, 10),
      confirmpass: bcryptjs.hashSync(req.body.confirmpass, 10),
      image: 'user-generic.png',
      role: 'user' 
    }
    User.create(userToCreate);
    res.redirect('/users/login');
  },
  profile: function(req,res){
    res.render('./users/profile',{user: req.session.userLogged});    
  },
  logout: function(req,res){
    res.clearCookie('userEmail');
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = usersController;