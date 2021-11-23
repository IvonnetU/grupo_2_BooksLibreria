// Declarando los modulos externos de express
const express = require('express');
const app = express();
const path = require('path');

//asignando la carpeta public como recurso estatico
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// Rutas
const routesMain = require('./routers/mainRouters.js');
const routesProduct = require('./routers/productRouters.js');
const routesUsers = require('./routers/usersRouters.js');
const routesAdmin = require('./routers/adminRouters.js');

// Invocar template engine EJS
app.set('view engine','ejs');

// Asignando el servidor

app.listen(3030, () => {
    console.log("Servidor ejecutandose en el puerto 3030");
});

// Declarando la ruta del archivo inicio
app.use('/', routesMain);

// Declarando la ruta del archivo detalle del producto y carrito de compras
app.use('/products', routesProduct);

// Declarando la ruta del archivo registro1 
app.use('/users', routesUsers);

// Declarando la ruta del archivo login
app.use('/admin', routesAdmin);
