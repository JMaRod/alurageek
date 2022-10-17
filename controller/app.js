/* Script principal del sitio    */

import { loginBtn, promotionBtn, searchBtn } from "./nav-buttons.js"
import { formContactInputs } from "./formContact-controller.js"
import { showAll, showAllCat } from "../services/show.js"
import { getAll, searchCategories } from "../services/get-data.js"

/*
$btnPromotion es el boton de la promocion del mes en el banner
*/
const $btnPromotion = document.getElementById(`buttonPromotion`);

/*
Se revisa cuando se le de click al botón de promoción, que ira a la sección de consolas para ello usaremos la pagina de búsqueda, para que en la misma se busquen todas las consolas y se impriman
*/
if ($btnPromotion!=null){
    $btnPromotion.addEventListener("click",event => {
        event.preventDefault();
        window.location.href = `./search.html?search=Consolas`
    });
}


(()=>{
    showAll();   
})();