// ************ Require's ************
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
// base de datos 
const db = require("../database/models");

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
  
  index: async (req,res) => {
    let productsDB = await db.Productos.findAll();
    let categorias = await db.Categorias.findAll();
    let autores = await db.Autores.findAll();

    res.render('./admin/manageProducts',{
      dataBooks: productsDB,
      categorias,
      autores,
      user: req.session.userLogged
    });
  },
   // Añadir - formulario de crear
  add: async (req, res) => {
    let categorias = await db.Categorias.findAll();
    let autores = await db.Autores.findAll();
    let formatos = await db.Formatos.findAll();

    res.render('./admin/addProduct',{
      categorias,
      autores,
      formatos
    });
  },
  // Crear -  Metodo de crear en la tienda
  store: async (req, res) => {
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
      const {nameBook,author,price,publisher, format, category, sku, language,edition, pages,chapters,description} = req.body;

    db.Productos.create({
        sku,
        nameBook, 
        idAuthor:author,
        price,
        publisher,
        idFormat:format,
        idCategory:category,
        languageBook:language,
        editionBook:edition,
        pages,
        chapters,
        descriptionBook:description,
        imageProduct: req.file.filename
    });  

    let productsUpdate = await db.Productos.findAll();
    let categorias = await db.Categorias.findAll();
    let autores = await db.Autores.findAll();
    res.render('./admin/manageProducts',{
      dataBooks: productsUpdate,
      categorias,
      autores,
      user: req.session.userLogged
    });

    }else{
      res.render('./admin/addProduct',{
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: req.session.userLogged
      });
    }
    				
  },

  // Edit - formulario de editar
  edit: async (req, res) => {
    let idProduct = req.params.id;

		let productEdit = await db.Productos.findByPk(idProduct);

    let categorias = await db.Categorias.findAll();
    let autores = await db.Autores.findAll();
    let formatos = await db.Formatos.findAll();

    res.render('./admin/editProduct',{ 
    product : productEdit, 
    categorias, 
    autores, 
    formatos});
    	
  },
  // Actualizar - método de actualizar
  update: async (req, res) => {
    let resultValidation = validationResult(req);

    if(resultValidation.isEmpty()){
      const {nameBook,author,price,publisher, format, category, sku, language,edition, pages,chapters,description,image} = req.body;

      const fileNameBook = (req.file) ? req.file.filename : image;
    
    db.Productos.update({
        sku,
        nameBook, 
        idAuthor:author,
        price,
        publisher,
        idFormat:format,
        idCategory:category,
        languageBook:language,
        editionBook:edition,
        pages,
        chapters,
        descriptionBook:description,
        imageProduct: fileNameBook
    },{
      where:{
        sku: req.params.id
      }
    });  

    let productsUpdate = await db.Productos.findAll();
    let categorias = await db.Categorias.findAll();
    let autores = await db.Autores.findAll();
    
    res.render('./admin/manageProducts',{
      dataBooks: productsUpdate,
      categorias,
      autores,
      user: req.session.userLogged
    });
    }else{
      res.render('./admin/editProduct',{
        errors: resultValidation.mapped(),
        product : productEdit,
        oldData: req.body,
        user: req.session.userLogged
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
		res.render('./admin/customers',{
    dataUsers: users,
    user: req.session.userLogged});
  },
  // Edit - formulario de editar cliente
  editCustomers:(req, res) => {
    let idCustomer = req.params.id;
		customerEdit = users.find(item => item.id == idCustomer);
    res.render('./admin/editCustomer',{ customer : customerEdit });
  },
  // Actualizar - método de actualizar
  updateCustomer: (req, res) => {
    let resultValidation = validationResult(req);
    if(resultValidation.isEmpty()){
      const {name,lastname,email,phone,city,pass,confirmpass,role,image} = req.body;
		const idCustomer = req.params.id;
    const fileNameCustomer = (req.file) ? req.file.filename : image;
    const customersNews = [];
    users.map(item =>{
			if(item.id == idCustomer){
				item.name_user = name; 
        item.last_name = lastname;
        item.email = email; 
        item.city = city;
        item.phone = phone;
        item.password = pass;
        item.confirmpass = confirmpass;        
        item.image = fileNameCustomer;
        item.role = role;        
        customersNews.push(item);
			}else{
        customersNews.push(item);
      }			
		});		
		fs.writeFileSync(usersFilePath,JSON.stringify(customersNews),'utf-8');
		res.render('./admin/customers',{dataUsers: customersNews});	
    }else{
      res.render('./admin/editCustomer',{
        customer : customerEdit,
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: req.session.userLogged
      });
    }    	
  },
  // Eliminar - Formulario de confirmar eliminado cliente
  deleteCustomer: (req, res) => {
    let idCustomer = req.params.id;
		customerDelete = users.find(item => item.id == idCustomer);
    return res.render('./admin/deleteCustomer',{customerDelete});
  },
  // Borrar - Eliminar un cliente de la BD
  destroyCustomer: (req, res) => {
    let idCustomer = req.params.id;
		const customersNews = [];
		users.map(item =>{
			if(item.id != idCustomer){
				customersNews.push(item);
			}			
		});		
		fs.writeFileSync(usersFilePath,JSON.stringify(customersNews),'utf-8');
		res.render('./admin/customers',{dataUsers: customersNews});		
  },
}

module.exports = adminController;