const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// base de datos 
const db = require("../../database/models");

const categoryController = {
    // Listado de categorias
	list: async (req, res) => {
		db.Categorias.findAll().then((category) => {
      let respuesta = {
                meta: {
                    status : 200,
                    total: category.length,
                    url: '/api/category'
                },
                data: category
            }
			res.json(respuesta);
    })            
	}
};

module.exports = categoryController;