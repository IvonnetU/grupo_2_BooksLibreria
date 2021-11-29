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

let adminController = {
  //Index - Mostrar el administrador de productos
  index: function(req,res){
    res.render('./admin/manageProducts',{ dataBooks: products });
  },
   // Añadir - formulario de crear
  add:(req, res) => {
    res.render('./admin/addProduct');
  },
  // Crear -  Metodo de crear en la tienda
  store:(req, res) => {
    const {nameBook,author,price,publisher, format, category, sku, language,edition, pages,chapters,description} = req.body;
		let idPrev = products.length;
		const dataNew = {
			id: idPrev + 1,
      sku,
			name:nameBook, 
      author,
      price,
      publisher,
      format,
      category,
      language,
      edition,
      pages,
      chapters,
			description,
      image: req.file.filename
		}
		products.push(dataNew);
		fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
    res.render('./admin/manageProducts',{ dataBooks: products });		
  },

  // Edit - formulario de editar
  edit:(req, res) => {
    return res.render('./admin/editProduct');
  },
  // Actualizar - método de actualizar
  update: (req, res) => {
    //code
  },
  // Borrar - Eliminar un producto de la BD
  delete: (req, res) => {
    //code
  }
}

module.exports = adminController;