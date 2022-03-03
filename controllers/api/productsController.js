// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// base de datos 
const db = require("../../database/models");

const productsController = {
	// Listado de productos
	list: async (req, res) => {
		db.Productos.findAll().then((products) => {
      let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/products'
                },
                data: products
            }
			res.json(respuesta);
    })            
	},
	// Detail - Detail from one product
	detail: async (req, res) => {
    let id = req.params.id;

    db.Productos.findByPk(id)
    .then(products => {
        let respuesta = {
            meta: {
                status: 200,
                total: products.length,
                url: '/api/products/:id'
            },
            data: products
        }
        res.json(respuesta);
    });
	}
};

module.exports = productsController;