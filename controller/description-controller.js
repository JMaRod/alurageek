import { formContactInputs } from "./formContact-controller.js"
import { getProducts } from "../services/crud-services.js";
import { searchBtn, searchBtnSmart } from "./nav-buttons.js";

/* 
son las varibles para obtener el id 
$idParam obtiene la url de pagina actual
$id guarda el id para ello $idParam.get("id") obtiene el texto que este despues del ?id= en la url
 */
const $idParam = new URLSearchParams(document.location.search);
const $id = $idParam.get("id");

/*
Es la función que trae los productos con getProducts 
Despues con find buscamos el product que tenga el product.id que coincida con el $id de la pagina
Por útlimo lo mandamos imprimir con showDescription
*/
async function getProduct(){
    let relatedProducts=[];
    let relatedCategory;
    const products = await getProducts();
    products.find(product => {
        if (product.id == $id){
            showDescription(product)
            relatedCategory=product.category;
        }
    })

    products.find(product =>{
        if(product.category == `${relatedCategory}`)
            relatedProducts.push(product)
    })
    if(relatedProducts!=0){
        showRelated(relatedProducts);
    } else {
        for (let i=0; i<=5; i++ ){
            relatedProducts.push(products[i])
        }
        showRelated(relatedProducts);
    }

}getProduct();

/*
Aquí vamos a renderizar el producto en la página
    1. buscamos es lugar en donde insertaremos el contenido con [$conteinerDescription = document.querySelector(".description");]
    2. obtenemos el template del contenido de la página con [$template = document.getElementById("templateDescription").content]
    3. por último hacemos un clone del template para trabajar con el y luego insertarlo en el DOM
    4. llenamos los datos necesarios en el template
    5. hacemos que el [$conteinerDescription] adopte al clon del template ya llenado con [$templateDescription]
*/
function showDescription(product){
    const $conteinerDescription = document.querySelector(".description");
    const $template = document.getElementById("templateDescription").content;
    const $templateDescription = document.importNode($template , true);
    $templateDescription.querySelector(".description__img").setAttribute("src", `${product.img}`);
    $templateDescription.querySelector(".description__text__tittle").textContent=`${product.name}`;
    $templateDescription.querySelector(".description__text__price").textContent=`$ ${product.price}`
    $templateDescription.querySelector(".description__text__content").textContent=`${product.description}`
    $conteinerDescription.appendChild($templateDescription);
}


/*
Se mostraran los productos relacionados con el actual, para lo que se mostraran los productos que tengan la misma categoría
*/
function showRelated(relatedProducts){
    const $cards__container = document.querySelector(".cards__container");
    const $templateCard = document.getElementById("cardsTemplate").content;
    const $fragment = document.createDocumentFragment();
    relatedProducts.forEach(product => {
        const $cloneTemplateCard = document.importNode($templateCard, true);
        $cloneTemplateCard.querySelector(".card__img").setAttribute("class", `card__img card__img--${product.id}`);
        $cloneTemplateCard.querySelector(".card__tittle").textContent = `${product.name}`;
        $cloneTemplateCard.querySelector(`.card__img--${product.id}`).style.backgroundImage = `url("${product.img}")`;
        $cloneTemplateCard.querySelector(".card__subTittle").textContent = `$ ${product.price}`;
        $cloneTemplateCard.querySelector(".card__link").setAttribute("href", `/screens/description.html?id=${product.id}`);
        $fragment.appendChild($cloneTemplateCard)
    });
    $cards__container.appendChild($fragment);
}