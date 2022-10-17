/*
En esta sección se mostraran todos los productos y se les añadirán los botones para eliminar y para editar
*/
import { formContactInputs, formBtn } from "../controller/formContact-controller.js";
import { crud, getProducts} from "../services/crud-services.js"
import { showAllEdit } from "../services/show.js";
import { searchBtn, searchBtnSmart} from "../controller/nav-buttons.js"

//La variable product sirve para mandar un objeto producto para el método DELETE
let product={};

//addEventListener("DOMContentLoaded" escucha cuando el DOM se carga y ejecuta una función
addEventListener("DOMContentLoaded" , showProdructsAdmin())

/**
Cargamos todos los productos y los imprimimos con showAllEdit
 */
async function showProdructsAdmin(){
    let products = await getProducts()
    showAllEdit(products, "Todos");
}

/*
En este EventListener vamos a escuchar cualquier click sin importar de donde sea, después con ayuda de event.target.matches(".removeBtn") compararemos que el click se dio en un lugar que queremos, para eso  [event.target.matches revisa] que el click coincida con una clase, en este caso con .removeBtn.
En caso de ser afirmativo llenamos el product con un id que nos trajimos del lugar donde se dio el click [event.target.dataset.id] (hay que recordar que con [product.id=event.target.dataset.id] agregamos el elemento id a product -aunque id no estaba declarado en un inicio-)
Por último llamamos a la función crud pasando el product y el string delete

*/
document.addEventListener("click", async (event)=>{
    if(event.target.matches(".removeBtn")){
        event.preventDefault();
        if(confirm(`¿Quieres borrar el producto con el id ${event.target.dataset.id}? `)){
            product.id=event.target.dataset.id;
            await crud(product,"delete")
        }
    }
})
