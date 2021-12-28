// ************ Require's ************
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

/*********Conectando Json***********/
//Productos
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Usuarios
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


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
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
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
      res.render('./admin/manageProducts',{dataBooks: products});
    }else{
      res.render('./admin/addProduct',{
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    				
  },

  // Edit - formulario de editar
  edit:(req, res) => {
     let idProduct = req.params.id;
		productEdit = products.find(item => item.id == idProduct);
    res.render('./admin/editProduct',{ product : productEdit });	
  },
  // Actualizar - método de actualizar
  update: (req, res) => {
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
      const {nameBook,author,price,publisher, format, category, sku, language,edition, pages,chapters,description,image} = req.body;
		const idProduct = req.params.id;
    const fileNameBook = (req.file) ? req.file.filename : image;
    const booksNews = [];
    products.map(item =>{
			if(item.id == idProduct){
        item.sku = sku;
				item.name = nameBook; 
        item.author = author;
        item.price = price; 
        item.publisher = publisher;
        item.format = format;
        item.category = category;
        item.language = language;        
        item.edition = edition;
        item.pages = pages;
        item.chapters = chapters;
				item.description = description;
        item.image = fileNameBook;
        booksNews.push(item);
			}else{
        booksNews.push(item);
      }
			
		});		
		fs.writeFileSync(productsFilePath,JSON.stringify(booksNews),'utf-8');
		res.render('./admin/manageProducts',{dataBooks: booksNews});	
    }else{
      res.render('./admin/editProduct',{
        product : productEdit,
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }    	
  },
  // Eliminar - Formulario de confirmar eliminado
  delete: (req, res) => {
    let idProduct = req.params.id;
		productDelete = products.find(item => item.id == idProduct);
    return res.render('./admin/deleteProduct',{productDelete});
  },
  // Borrar - Eliminar un producto de la BD
  destroy: (req, res) => {
    let idBook = req.params.id;
		const booksNews = [];
		products.map(item =>{
			if(item.id != idBook){
				booksNews.push(item);
			}			
		});		
		fs.writeFileSync(productsFilePath,JSON.stringify(booksNews),'utf-8');
		res.render('./admin/manageProducts',{dataBooks: booksNews});		
  },
  // Clientes - Mostrar todos los clientes
  customers: (req, res) => {    
		res.render('./admin/customers',{dataUsers: users});
  }
}

module.exports = adminController;