var errorMsg = "";

function enviar() {
  event.preventDefault();
  comprobarCampos();
  if (errorMsg == "") {
    document.getElementById("registrolabel").innerHTML = `Se ha creado correctamente la cuenta de ${document.datos.nombre.value} ${document.datos.apellido1.value}`;
    document.body.classList.add("success");
  } else
    document.getElementById("registrolabel").innerHTML = "";
}

function comprobarCampos() {
  errorMsg = "";
  let campos = document.getElementsByTagName("input");
  let i;
  for (i = 0; i < campos.length; i++) {
    let error
    if ((error = validar(campos[i])) != "") {
      errorMsg += error + "<br>";
      marcarError(campos[i]);
    } else {
      limpiarError(campos[i]);
    }
  }
  document.getElementById("errorlabel").innerHTML = errorMsg;
}

function validar(campo) {
  switch (campo.name) {
    case "nombre":
      return validarNombre(campo.value);
    case "apellido1":
      return validarApellido1(campo.value);
    case "apellido2":
      return validarApellido2(campo.value);
    case "nacimiento":
      return validarNacimiento(campo.value);
    case "email":
      return validarEmail(campo.value);
    case "telefono":
      return validarTelefono(campo.value);
    case "passw":
      return validarPassw(campo.value);
    case "confirmpassw":
      return validarConfirmPassw(campo.value);
  }
}

function validarNombre(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Nombre</b> es obligatorio";
  else if (value.match(/[0-9]/g)) error += "El <b>Nombre</b> no puede contener números"
  return error;
}

function validarApellido1(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Primer Apellido</b> es obligatorio";
  else if (value.match(/[0-9]/g)) error += "El <b>Primer apellido</b> no puede contener números";
  return error;
}

function validarApellido2(value) {
  error = "";
  if (value.match(/[0-9]/g)) error += "El <b>Segundo apellido</b> no puede contener números";
  return error;
}

function validarNacimiento(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Fecha de Nacimiento</b> es obligatorio";
  else if (new Date(value) > Date.now()) error += "La <b>Fecha de nacimiento</b> no puede ser superior a la fecha de hoy";
  else if (new Date(Date.now()).getFullYear() - new Date(value).getFullYear() < 18) error += "<b>Debes ser mayor de edad para registrarte</b>";
  return error;
}

function validarEmail(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Correo Electrónico</b> es obligatorio"
  else if (value.match(/.+@.+\..+/) == null) error += "El <b>Correo</b> introducido no tiene un formáto válido"
  return error;
}

function validarTelefono(value) {
  error = "";
  if (value.trim() == "") return ""
  else if (value.match(/[A-Za-z]/g) != null) error += "El <b>Teléfono</b> no puede contener letras"
  else if (!(value.length == 9 || (value.length == 12 && value[0] == '+'))) 
    error += "El <b>Teléfono</b> no tiene la cantidad de dígitos esperada"
  return error;
}

function validarPassw(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Contraseña</b> es obligatorio";
  else if (value.length < 8                   // Menos de 9 caracteres
            || value.match(/[0-9]/g) == null  // o no tiene digitos
            || value.match(/[a-z]/g) == null  // o no tiene minusculas
            || value.match(/[A-Z]/g) == null  // o no tiene mayusculas
  ) error += `La <b>Contraseña</b> es demasiado débil<br> • Debe contener al menos una mayúscula, minúscula y dígito<br> • Debe contener al menos 8 caracteres`;
  return error;
}

function validarConfirmPassw(value) {
  error = "";
  if (value.trim() == "") error += "El campo <b>Confimar contraseña</b> es obligatorio";
  else if (value != document.datos.passw.value) error += "Las <b>Contraseñas</b> deben coincidir";
  return error;
}

function marcarError(campo) {
  let tmp = document.getElementById("errorlabel");
  campo.classList.add("error");
}

function limpiarError(campo) {
  campo.classList.remove("error");
}