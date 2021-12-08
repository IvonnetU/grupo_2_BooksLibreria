// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");

// ************ Controller Require ************
const adminController = require("../controllers/adminController");

/************** Declaración de multer ******/
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

/*** GET TODOS LOS PRODUCTOS ***/
router.get("/", adminController.index);

/*** CREAR UN PRODUCTO ***/
router.get("/create", adminController.add);
router.post("/create",fileUpload.single("imagebook"),validateFormCreate,adminController.store);

/*** EDITAR UN PRODUCTO ***/
router.get("/edit/:id", adminController.edit);
router.put("/edit/:id", fileUpload.single("imagebook"),validateFormEdit, adminController.update);

/*** ELIMINAR UN PRODUCTO***/
router.get("/delete/:id", adminController.delete);
router.delete("/delete/:id", adminController.destroy);

module.exports = router;
