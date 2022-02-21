window.addEventListener('load', function () {
  const form = document.querySelector('#formProduct');

   form.addEventListener("submit", function (e) {  
    const errores = [];

    // Validar campo nombre del libro
    let nameBook = document.querySelector('#nameBook');
    if(nameBook.value == ''){
      errores.push('El campo nombre no puede estar vacio');
    }else if(nameBook.value.length <= 5){
      errores.push('El campo nombre del libro debe ser al menos 5 caracteres');
    }
    // Validar campo de precio
    let price = document.querySelector('#price');
    if(price.value == ''){
      errores.push('El campo precio no puede estar vacio');
    }

    // Validar campo de sku
    let sku = document.querySelector('#sku');
    if(sku.value == ''){
      errores.push('El campo sku no puede estar vacio');
    }

    // Validar campo de lenguaje
    let language = document.querySelector('#language');
    if(language.value == ''){
      errores.push('El campo lenguaje no puede estar vacio');
    }

    // Validar campo de edición
    let edition = document.querySelector('#edition');
    if(edition.value == ''){
      errores.push('El campo edición no puede estar vacio');
    }

    // Validar campo de paginas
    let pages = document.querySelector('#pages');
    if(pages.value == ''){
      errores.push('El campo paginas no puede estar vacio');
    }

    // Validar campo de capitulos
    let chapters = document.querySelector('#chapters');
    if(chapters.value == ''){
      errores.push('El campo capitulos no puede estar vacio');
    }

    // Validar campo de descripción
    let description = document.querySelector('#description');
    if(description.value == ''){
      errores.push('El campo descripción no puede estar vacio');
    }

    if(errores.length > 0){
       // Para que el formulario no se envie antes de realizar estas validaciones
      e.preventDefault();

      let ulErrores = document.querySelectorAll('.errorsJs ul');
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML+= "<li>"+errores[i]+"</li>"
      }
    }

  });
})