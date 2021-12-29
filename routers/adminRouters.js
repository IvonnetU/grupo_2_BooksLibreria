// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");

// ************ Controller Require ************
const adminController = require("../controllers/adminController");

// ************ Middlewares ************
// const validations = require("../middlewares/validations")

/************** Declaración de multer Productos ******/
let multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../public/images/books");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    let imageName = "book-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

/************** Declaración de multer Clientes ******/
let multerDiskStorageCustomers = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../public/images/avatars");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    let imageName = "avatar-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUploadCustomer = multer({ storage: multerDiskStorageCustomers });

/************** Validación del formulario ****************/
const validateFormCreate = [
  body('nameBook').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('author').notEmpty().withMessage('Debes completar el campo de autor'),
  body('price').notEmpty().withMessage('Debes completar el campo de precio')
  .bail()
  .isInt().withMessage('Introduce un número'),
  body('publisher').notEmpty().withMessage('Debes completar el campo de editorial'),
  body('format').notEmpty().withMessage('Debes completar el campo de formato del libro'),
  body('category').notEmpty().withMessage('Debes seleccionar una categoria del libro'),
  body('sku').notEmpty().withMessage('Debes completar el campo de sku'),
  body('language').notEmpty().withMessage('Debes completar el campo de lenguaje'),
  body('edition').notEmpty().withMessage('Debes completar el campo de edición'),
  body('pages').notEmpty().withMessage('Debes completar el campo de páginas'),
  body('chapters').notEmpty().withMessage('Debes completar el campo de capítulos'),
  body('imagebook').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png'];    
    if(!file){
      throw new Error('Tienes que subir una imagen');
    }else{
      let fileExtension = path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error( `Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
      }
    }    
    return true;
  }),
  body('description').notEmpty().withMessage('Debes completar el campo de descripción'),
];
const validateFormEdit = [
  body('nameBook').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('author').notEmpty().withMessage('Debes completar el campo de autor'),
  body('price').notEmpty().withMessage('Debes completar el campo de precio')
  .bail()
  .isInt().withMessage('Introduce un número'),
  body('publisher').notEmpty().withMessage('Debes completar el campo de editorial'),
  body('format').notEmpty().withMessage('Debes completar el campo de formato del libro'),
  body('category').notEmpty().withMessage('Debes seleccionar una categoria del libro'),
  body('sku').notEmpty().withMessage('Debes completar el campo de sku'),
  body('language').notEmpty().withMessage('Debes completar el campo de lenguaje'),
  body('edition').notEmpty().withMessage('Debes completar el campo de edición'),
  body('pages').notEmpty().withMessage('Debes completar el campo de páginas'),
  body('chapters').notEmpty().withMessage('Debes completar el campo de capítulos'),
  body('description').notEmpty().withMessage('Debes completar el campo de descripción'),
];

const validateFormEditCustomer = [
  body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('lastname').notEmpty().withMessage('Debes completar el campo de apellido'),
  body('email').notEmpty().withMessage('Debes completar el campo de email').isEmail().withMessage('Debes ingresar un email valido'),
  body('city').notEmpty().withMessage('Debes completar la ciudad'),
  body('phone').isMobilePhone().withMessage('Debes ingresar un número valido'),
  body('pass').notEmpty().withMessage('Debes completar el campo de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres'),
  body('confirmpass').notEmpty().withMessage('Debes completar el campo de confirmación de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres').custom((value, {req}) => (value === req.body.pass)).withMessage('las contraseñas no coinciden'),
  body('role').notEmpty().withMessage('Rol no puede estar vacío')
];

/************** Validación del formulario ****************/
const authMiddleware = require('../middlewares/authMiddleware');

/*** GET TODOS LOS PRODUCTOS ***/
router.get("/", authMiddleware, adminController.index);

/*** CREAR UN PRODUCTO ***/
router.get("/create",authMiddleware, adminController.add);
router.post("/create",fileUpload.single("imagebook"),validateFormCreate,adminController.store);

/*** EDITAR UN PRODUCTO ***/
router.get("/edit/:id",authMiddleware, adminController.edit);
router.put("/edit/:id", fileUpload.single("imagebook"),validateFormEdit, adminController.update);

/*** ELIMINAR UN PRODUCTO***/
router.get("/delete/:id",authMiddleware, adminController.delete);
router.delete("/delete/:id", adminController.destroy);

/*** GET TODOS LOS CLIENTES ***/
router.get("/customers",authMiddleware, adminController.customers);

/*** EDITAR UN CLIENTE ***/
router.get("/customer/edit/:id",authMiddleware, adminController.editCustomers);
router.put("/customer/edit/:id", fileUploadCustomer.single("image"),validateFormEditCustomer, adminController.updateCustomer);

/*** ELIMINAR UN CLIENTE***/
router.get("/customer/delete/:id", authMiddleware, adminController.deleteCustomer);
router.delete("/customer/delete/:id", adminController.destroyCustomer);

module.exports = router;
