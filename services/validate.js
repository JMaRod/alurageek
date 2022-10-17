export { validate, validateButton, validateResult };

const regexName = /^([A-Za-zñÑ\s]){1,40}$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexProdructName = /^([\d]+)(\.\d{1,2}){0,1}$/;

/* En esta función recolectaremos los inputs forms y llamaremos  a un verificador especifico para  cada form dependiendo de su nombre  */
function validate(input) {
    const inputType = input.dataset.tipo;
    if ( inputType == "nombre"){
        validateName( input );
    } else if (inputType == "mensaje"){
        validateMessage( input );
    } else if (inputType == "email"){
        validateEmail( input )
    } else if (inputType == "urlProduct") {
        validateUrlProduct ( input )
    } else if (inputType == "categoryProduct") {
        validateCategoryProduct ( input )
    } else if ( inputType == "nameProduct") {
        validateNameProduct ( input )
    } else if (inputType == "priceProduct") {
        validatePriceProduct ( input )
    } else if (inputType == "descriptionProduct") {
        validateDescriptionProduct ( input )
    } else if (inputType == "buscar") {
        validateSearch( input );
    }
};

/* Validamos el nombre, primero que no esté vacío, segundo que no sea mayor a 40 y por ultimo el regex, nota aunque en el regex ya están estos detalles, se pusieron por separado para poder, mandar mensajes específicos para cada error  */

function validateName( input ){
    if ( input.validity.valueMissing){
        input.setCustomValidity("El campo nombre no puede estar vacío");
    } else if (input.value.length > 40){
        input.setCustomValidity("El campo nombre no puede tener mas de 40 caracteres ");
    } else if (!regexName.test(input.value)){
        input.setCustomValidity("El campo nombre solo debe tener espacios y letras");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
    /* NOTA: como estamos mandando errores personalizados para que se muestren con un globo en el navegador (es decir cambiamos el error que se debería mostrar por default), al final se le tiene que poner un error en blanco   */
}

/* Validamos el mensaje, primero que el mensaje no este en blanco y segundo que no sea mayor a 140 caracteres  */
function validateMessage( input ){
    if ( input.validity.valueMissing){
        input.setCustomValidity("El campo mensaje no puede estar vacío ");
    } else if (input.value.length > 120){
        input.setCustomValidity("El campo mensaje no puede tener más de 120 caracteres  ");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos el correo, primero que el mensaje no esté en blanco y segundo que cumpla con el formato regex */

function validateEmail( input ){
    if ( input.validity.valueMissing){
        input.setCustomValidity("El campo nombre no puede estar vacío");
    } else if (!regexEmail.test(input.value)){
        input.setCustomValidity("Debe tener un formato de email, como tunombre@dominio.com");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos la url para que no esté vacía */

function validateUrlProduct ( input ){
    if ( input.validity.valueMissing){
        input.setCustomValidity("Debes agregar un imagen");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos que la categoría no este vacía y que no sea mayor a 20 caracteres  */
function validateCategoryProduct ( input ) {
    if ( input.validity.valueMissing){
        input.setCustomValidity("El campo categoría no debe estar vacío");
    } else if (input.value.length > 20){
        input.setCustomValidity("El campo categoría debe ser menor a 20 caracteres   ")
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos que el nombre de producto no este vacío y que sea menor a 20 caracteres  */

function validateNameProduct ( input ) {
    if ( input.validity.valueMissing){
        input.setCustomValidity("El campo nombre no debe estar vacío");
    } else if (input.value.length > 20){
        input.setCustomValidity("El campo nombre del producto debe ser menor a 20 caracteres")
    }else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos que el campo Price solo pueda tener números y un punto */

function validatePriceProduct ( input ) {
    if ( input.validity.valueMissing ){
        input.setCustomValidity("El campo precio no puede estar vacío");
    } 
    else if ( !regexProdructName.test(input.value)){
        input.setCustomValidity("El formato del precio deber ser parecido a 1111.00 o 11111");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos que el campo description no este vacío y que no sea mayor a 150 caracteres  */

function validateDescriptionProduct ( input ) {
    if ( input.validity.valueMissing ){
        input.setCustomValidity("Debes agregar una descripción");
    } else if ( input.value.length > 150){
        input.setCustomValidity("La descripción deber ser menor a 150 caracteres")
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Validamos que el campo de busqueda no este en blanco y que sea mayor a 30 caracteres */

function validateSearch( input ){
    if ( input.validity.valueMissing ){
        input.setCustomValidity("Escribe un termino para buscar");
    } else if ( input.value.length > 30 ){
        input.setCustomValidity("El termino de busqueda no debe ser mayor a 30 caracteres");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

/* Aquí se le pondrán recuadros rojos para señalar el error en los campos que estén erróneos  */

function validateResult ( input ) {
    if (!input.validity.valid){
        input.parentElement.classList.add("form__items--red");
        return false;
    } else {
        input.parentElement.classList.remove("form__items--red");
        return true;
    }

}

/* Esta es la parte validara que los campos del formulario contacto estén correctos, cuando se le da click al botón enviar mensaje    */
function validateButton ( formSearch ){
    const formContactInputs = document.querySelectorAll(`.${formSearch}`);
    let numberInputs = 0;
    let validate=false;
    formContactInputs.forEach( (element) => {
        if (validateResult( element )){
            numberInputs+=1;
        } 
    })
    if (numberInputs === formContactInputs.length){
        validate = true;
    } 
    return validate;
};



