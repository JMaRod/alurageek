import { validate, validateButton, validateResult } from "../services/validate.js";
import { formContactInputs, formBtn } from "./formContact-controller.js";

const formsAddinput = document.querySelectorAll(".form__input__add");
const submitBtnAdd = document.querySelector("#submitAdd");
/*
Se van a revisar los eventos donde se le de click o cambie el valor de los inputs del form de agregar producto.
*/
formsAddinput.forEach ( ( input ) => {
    input.addEventListener("click", (input) => {
        validate( input.target );
        validateResult( input.target );
    })
    input.addEventListener("keyup", (input) => {
        validate( input.target );
        validateResult ( input.target );
    })
});

/* Para el botón de enviar mensaje se revisara el evento cuando se le da click  */
submitBtnAdd.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateButton("form__input__add")) {
        alert("se ingreso producto");
        document.querySelector(".form__add").reset();
    } else {
        alert("no se ingreso producto ");
    }
});