import { validate, validateButton, validateResult } from "../services/validate.js";

/* Aquí van los botones que sirven para navegar por el sitio   */
const loginBtn = document.querySelector(".header__buttonSession__link");
const promotionBtn = document.querySelector("#buttonPromotion");
const searchBtn = document.querySelector(".header__search--big");
const searchBtnSmart = document.querySelector(".header__search--smart");

var searchText = "";

/* botón de login */
if (loginBtn!=null){
    loginBtn.addEventListener("click", (event) =>{
        event.preventDefault();
        window.location.href = "/screens/login.html"
    });
}


/* Botón para ir a la sección de consolas   */
if (promotionBtn!=null){
    promotionBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `./search.html?search=Consolas`
    });
}

/* Botónes para ir a usar la busqueda*/
if(searchBtn!=null){
    searchBtn.addEventListener("click", ( event) => {
        event.preventDefault();
        let input = document.querySelector("#search")
        validate(input)
        if ( input.validity.valid ){
            searchText=input.value;
            window.location.href = `./search.html?search=${input.value}`
        }
    });
}

/*
Se revisa si es que el boton [searchBtnSmart], existe en el render actual, 
    en caso de no tener el boton y no poner este if, dara error porque el import de [../services/validate.js].
    importa todo, dado que no esta divido por funciones.
*/
if(searchBtnSmart!=null){
    searchBtnSmart.addEventListener("click", ( event) => {
        event.preventDefault();
        window.location.href = `./search.html`
    });    
}


export {loginBtn, promotionBtn, searchBtn, searchBtnSmart, searchText};
