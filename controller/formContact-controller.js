/* Aquí van los controles que manejan al form de contacto  */

import { validate, validateButton, validateResult } from "../services/validate.js";


const formContactInputs = document.querySelectorAll(".form__input__contact");
/* Obtenemos todos los inputs del form de contacto  */
const formBtn = document.querySelector("#submitContact");
/* Obtenemos el botón     */


/* Par cada input vamos a revisar su contenido para estar validando, se validaran en dos eventos con blur cuando el focus se salga del input y keyup para cada que se suelta una tecla del teclado (para revisar mientras que se esta escribiendo) */
if (formContactInputs!=null){
    formContactInputs.forEach((input) =>{
        input.addEventListener("click", (input) => {
            validate(input.target);
            validateResult( input.target );
            
        })
        input.addEventListener("keyup", (input) => {
            validate(input.target);
            validateResult( input.target );
        })
    });
}

/* Para el botón de enviar mensaje se revisara el evento cuando se le da click  */
if (formBtn!=null){
    formBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (validateButton("form__input__contact")){
            alert("Se envió el mensaje");
            document.querySelector(".form__contact").reset();
        } else {
            alert("El mensaje no se envió ");
        }
    });
}

export { formContactInputs, formBtn }
