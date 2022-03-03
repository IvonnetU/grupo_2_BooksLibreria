// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// base de datos 
const db = require("../../database/models");

const usersController = {
	// Listado de Usuarios
	list: async (req, res) => {
		db.Usuarios.findAll().then((users) => {
      let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users'
                },
                data: users
            }
			res.json(respuesta);
    })            
	},
	// Detalle de un usuario
	detail: async (req, res) => {
    let id = req.params.id;

    db.Usuarios.findByPk(id)
    .then(users => {
        let respuesta = {
            meta: {
                status: 200,
                total: users.length,
                url: '/api/users/:id'
            },
            data: users
        }
        res.json(respuesta);
    });
	}
};

module.exports = usersController;