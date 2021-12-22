// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

let mainController = {
  index: function(req,res){
    // let filterGenere = (req.params) ? req.params.genere : "Young adult";
		// productsGenere = products.filter(item => item.category == filterGenere);
    // const booksFilter = [];
    // products.reverse();
    // for (let i = 0; i < 8; i++) {
    //   booksFilter.push(products[i]);
    // }
    res.render('./main/index', {dataBooks:products});
  }
}

module.exports = mainController;