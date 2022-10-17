/*
Son las funciones para buscar por nombre o por categoría 
*/
import { formContactInputs } from "/controller/formContact-controller.js"
import {getAll} from "../services/get-data.js"
import {showError,addContentCard } from "./show.js"
import { loginBtn } from "/controller/nav-buttons.js"

/*
URLSearchParams guarda varios datos de las url, con (document.location.search), indicamos la página actual, antes ya se había añadido a la dirección el termino de búsqueda, por eso lo obtenemos con URLSearchParams
params.get("search") obtenemos el valor que vamos a buscar y lo pasamos a minúsculas
categorySearch guarda la categoría bajo la cual renderizamos los resultados de la búsqueda
products guarda todos los productos que están en el JSON, se pone await porque la función es asíncrona, recordar que esta función la estamos importando
*/
let params = new URLSearchParams(document.location.search)
let categorySearch = "Busqueda";
let products =  await getAll();

/*
verificamos que en products no vengan los códigos de error
en caso de que todo este bien mandamos llamar a searchCategory y le mandamos products
*/
function checkErrorJson(){
    if(!products=="401"||products=="404"||products==null){
        showError(products)
    }else{
        searchCategory(products)
    }
}

/*
verificamos que el texto introducido como búsqueda coincida con alguna categoría
category guarda la categoría de cada elemento (producto) y lo convierte a minúsculas
verificamos que category incluya el término a buscar (searchText)
en caso de que si se encuentre, se manda a renderizar con addContentCard (importada),
en caso de no encontrarse, se guarda ese producto en un nuevo arreglo que pasaremos a searchName
*/
function searchCategory(products){
    let productsNotFound = [];
    let categoryNotFound=false;
    let searchText = params.get("search").toLowerCase();
    products.forEach(element => {
            let category = element.category.toLowerCase();  
            if(category.includes(searchText)){
                addContentCard(element, categorySearch)
            }
            else{
                productsNotFound.push(element)
            }
    });
    if (products.length===productsNotFound.length)
        categoryNotFound=true;
    searchName(productsNotFound,searchText,categoryNotFound)
}

/*
verificamos que el texto introducido como búsqueda coincida con algun nombre de producto
name guarda el nombre de cada elemento (producto) y lo convierte a minúsculas
verificamos que ese nombre coincida con el término a buscar (searchText)
en caso de que si se encuentre, se manda a renderizar con addContentCard (importada),
*/
function searchName(products, searchText, categoryNotFound){
    let productsNotFound = [];
    products.forEach(element => {
            let name = element.name.toLowerCase(); 
            if(name.includes(searchText)){
                addContentCard(element, categorySearch)
            }
            else{
                productsNotFound.push(element)
            }
    });
    if ((categoryNotFound===true)&&(products.length===productsNotFound.length))
        emptySearch(true, searchText)
}

function emptySearch(status,words){
    if (!status)
        document.querySelector(".category__tittle__text").textContent="Escribe un termino para buscar";
    else    
        document.querySelector(".category__tittle__text").textContent=`La búsqueda ${words} no produjo resultados`;
}

function search(){
    if (params.get("search")!=null)
        checkErrorJson();
    else
        emptySearch(false,``);
}
search();

export {search}

