window.addEventListener('load', function () {
  const form = document.querySelector('#formUser');

   form.addEventListener("submit", function (e) {  
    const errores = [];

    // Validar campo nombre del usuario
    let name = document.querySelector('#name');
    if(name.value == ''){
      errores.push('El campo nombre no puede estar vacio');
    }

    // Validar campo apellido del usuario
    let lastname = document.querySelector('#lastname');
    if(lastname.value == ''){
      errores.push('El campo apellido no puede estar vacio');
    }
    
    // Validar campo email del usuario
    let email = document.querySelector('#email');
    if(email.value == ''){
      errores.push('El campo email no puede estar vacio');
    }

    // Validar campo ciudad del usuario
    let city = document.querySelector('#city');
    if(city.value == ''){
      errores.push('El campo ciudad no puede estar vacio');
    }

    // Validar campo telefono celular del usuario
    let phone = document.querySelector('#phone');
    if(phone.value == ''){
      errores.push('El campo telefono celular no puede estar vacio');
    }

    // Validar campo contraseña del usuario
    let pass = document.querySelector('#pass');
    if(pass.value == ''){
      errores.push('El campo contraseña no puede estar vacio');
    }

    // Validar campo confirmar contraseña del usuario
    let confirmpass = document.querySelector('#confirmpass');
    if(confirmpass.value == ''){
      errores.push('El campo confirmar contraseña no puede estar vacio');
    }

    if(errores.length > 0){
       // Para que el formulario no se envie antes de realizar estas validaciones
      e.preventDefault();

      let ulErrores = document.querySelectorAll('.errorsUser ul');
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML+= "<li>"+errores[i]+"</li>"
      }
    }

  });
})