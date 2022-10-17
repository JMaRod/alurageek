// import {getAll} from "../services/get-data.js"
import {getProducts} from "../services/crud-services.js"

/* este apartado es para crear una categoria, donde colocar las card,
1. creamos un elemento div donde guardaremos el contenido
2. al div le agregamos la clase category
3. le agregamos el id que deseamos tenga para poner como nombre de la seccion, ejemplo consolas
4. construimos una variable donde estara el contenido del div category y div donde can las cards
5. insertamos esa variable en el div que creamos en el pso 1
6. regresamos ese htmlnode*/

function addContenCategory(category){
    const $products = document.querySelector(".products");
    const $template = document.getElementById("templateCategory").content;        
    // clonamos el template de lo contrario si lo llenamos y lo renderizamos, y a no tendriamos el templetate original
    let $cloneTemplate = document.importNode($template, true);
    $cloneTemplate.querySelector(".category").setAttribute("id",`${category}`)
    $cloneTemplate.querySelector(".category__tittle__text").textContent=category;
    $cloneTemplate.querySelector(".category__tittle__link").setAttribute(`href`, `./search.html?search=${category}`)
    $products.appendChild($cloneTemplate);
    }


/*
aqui agregaremos la categoria creada en el html
1. seleccionamos el lugar donde se va a insertar,
2. mandamos a crear la categoria(es la funcion anterior),
3. el htmlnode donde queremos que se guarde la función, adoptará la nueva categoria, por ejemplo products adoptara a category
*/
function addCategory(category){
    addContenCategory(category);
}

/*
creamos una card
1. creamos un elemento div que tendra la card
2. en insert crearemos el contenido que añadiremos al div
3. insertamos el contenido al div
4. regresamos el div ya con el contenido dentro
*/

function addContentCard(product, category) {
    const $category = document.getElementById(`${category}`)
    const $templateCard = document.getElementById("templateCard").content;
    const $cardContainer = $category.querySelector(".cards__container");
    const $cloneTemplate = document.importNode($templateCard, true);
    $cloneTemplate.querySelector(".card").setAttribute(`data-id`,`${product.id}`)
    $cloneTemplate.querySelector(".card__img").setAttribute("class",`card__img card__img--${product.id}`)
    $cloneTemplate.querySelector(".card__tittle").textContent=product.name;
    $cloneTemplate.querySelector(".card__subTittle").textContent=`$ ${product.price}`;
    $cloneTemplate.querySelector(".card__link").setAttribute("href", `../screens/description.html?id=${product.id}`)
    $cardContainer.appendChild($cloneTemplate);
    backgroundImg(product)
}

/*
añadimos una imagen, modificando el css
1.obtenemos el id de la card donde vamos a poner la imagen,
2.despues asignamos la ruta de la imagen que vamos a usar
*/
function backgroundImg (product){
    var $imagen = document.querySelector(`.card__img--${product.id}`);
    $imagen.style.backgroundImage = `url("${product.img}")`;
}


function showError(error){
    const $category = document.querySelector(".category")
    const $error = document.createElement("div");
    $error.setAttribute("id", "errorPeticion");
    const insert = `<h2>ERROR ${error}, </h2>
    <h3>Intenta más tarde o ponte en contacto con el administrador</h3>`;
    $error.innerHTML = insert;
    $category.appendChild($error)
}


/*
buscamos las categorias, de todos los productos
1. recibimos la data de productos.json
2. creamos una varibale de arreglos que contendra todas las categorias encontradas
3. para cada producto(de la coleccion de productos del data), haremos los siguiente
    *comparamos si el arreglo categories incluye la categoria del producto actual
    *en caso de no estar lo metemos con el push
4. regresamos el arreglo de categorias
*/
function searchCategory(data){
    let categories = [];
    data.forEach(element => {
        if(!categories.includes(element.category))  
            categories.push(element.category)
    });
    return categories;
}

/*
mostramos las categorías
recibimos el arreglo de productos y el arreglo que contiene todas las categorías
1. creamos un arreglo que guardara todos los productos que tienen la misma categoría
2. Creamos las variables [$products, $fragment, $categoryTemplate], donde buscaremos el lugar donde se van a meter las categorías,
    el fragmento para llenar y despues mandarlo a renderizar, y la template de las categorías.
3. Para cada categoría haremos
        1. Clonamos el template para trabajar con el clon.
        2. Llenamos los valores de la categoría.
        3. Le indicamos a $fragment que adopte la categoría ya con los valores
4. Le indicamos a product que adopte el [$fragment] ya con las categorías.
5. Ya con las categorías renderizadas mandamos llamar a [showAllForCategory(products, categories)] para renderizar cada producto 
    en su respectiva categoría.
*/
function showAllCat(categories, products){
    const $products = document.querySelector(".products");
    const $fragment = document.createDocumentFragment();
    const $categoryTemplate = document.getElementById("templateCategory").content;
    categories.forEach(category =>{
        const $cloneCategoryTemplate = document.importNode($categoryTemplate, true);
        $cloneCategoryTemplate.querySelector(".category").setAttribute("id", `${category}`)
        $cloneCategoryTemplate.querySelector(".category__tittle__text").textContent = category;
        $cloneCategoryTemplate.querySelector(".category__tittle__link").setAttribute("href", `../screens/search.html?search=${category}`)
        $fragment.appendChild($cloneCategoryTemplate);
    })
    $products.appendChild($fragment);

    showAllForCategory(products, categories)
}

/**
 Se muestran lo productos con su categoría correspondiente
 recibe dos arreglos uno con todos los productos y el otro con todas las categorías
 1. Se crea la variable [groupForCategories] para guardar los productos que tengan la misma categoria.
 2. Para cada categoria haremos.
    1. Revisamos que el producto tenga la misma categoría de la que estamos usando actualmente(recordar que estamos renderizando los productos por categorías).
    2. en caso de ser iguales haremos
        1. Se crea una variable [$fragment] para añadir el contenido de los productos primero aquí.
        2. Se crea las varibale [$categoryContainer] que buscara en el render html la categoría donde se van a poner los productos.
        3. Se crea la variable [$cardContainer], esta variable guarda la ubicación donde se pondrán los productos PERO se buscara esa ubicación 
            en la categoría que corresponda.
        4. Para cada categoría haremos
                1. Crear la variable [$fragmentCard] que tendrá el templte de card.
                2. En la varibale [$cloneCardTemplate] clonamos el template de card para poder guardarlo.
                3. Llenamos la card de el producto.
                4. Con [$fragment.appendChild($cloneCardTemplate)] le indicamos a $fragment que adopte la card del producto.
    3. Una vez que se terminan todos los productos de la misma categoría, el [$fragment] donde se encuentra se manda a renderizar
        con [$cardContainer.appendChild($fragment)].
    4. Se vacia [groupForCategories=[]] para empezar con la siguiente categoría.
 */
function showAllForCategory(products, categories){
    
    let groupForCategories = [];
    
    categories.forEach(category => {
        products.forEach( product => {
            if(product.category==category)
                groupForCategories.push(product)
        })
        let $fragment = document.createDocumentFragment();
        let $categoryContainer = document.getElementById(`${groupForCategories[0].category}`)

        let $cardContainer = $categoryContainer.querySelector(`.cards__container`);

        groupForCategories.forEach(product =>{
            let $cardTemplate = document.getElementById(`templateCard`).content;
            let $cloneCardTemplate = document.importNode($cardTemplate, true);
            $cloneCardTemplate.querySelector(".card__img ").setAttribute("class",`card__img card__img--${product.id}`)
            $cloneCardTemplate.querySelector(`.card__img--${product.id}`).style.backgroundImage = `url("${product.img}")`;
            $cloneCardTemplate.querySelector(".card__tittle").textContent=sizeName(product.name);
            $cloneCardTemplate.querySelector(".card__subTittle").textContent=`$ ${product.price}`;
            $cloneCardTemplate.querySelector(".card__link").setAttribute(`href`,`href="./description.htm?id=${product.id}`);
            $fragment.appendChild($cloneCardTemplate)
            
        })
        $cardContainer.appendChild($fragment)
        groupForCategories=[]; 
    })
}


/*
esta funcion iniciaraá el proceso para mostrar todos los elementos con sus respectivas categorias
la const products es await porque espera una respuesta por lo mismo showAll es asincrona
1. verificamos que no tengamos codigos de errores o que productos sea null y mandamos a imprimir el error
2. en caso de no tener errores llamamos la funcion que busca las categorias y le mandamos la coleccion de productos
3. despues llamamos la funcion que imprime las categorias
 */
async function showAll(){
    const products = await getProducts();
    const categories = searchCategory(products)
    showAllCat(categories, products)

}

/* 
Vamos a poner un function que imprima todo pero con el boton edit y el boton remove.
Obtenemos la sección Category del DOM.
Obtenemos el contenido del template de las cards.
Obtenemos el lugar del cardConteiner que es donde añadiremos las cards con cada producto.
$fragment es un una pequeña parte del DOM donde vamos a ir añadiendo los producto, así no estamos haciendo una inserción por cada producto lo que es muy bueno para el rendimiento del navegador.

A cada producto le lo llenamos le asignamos algunos valores.
    después de agregar los valores clonamos el template (ya lleno) en otra variable con [const $cloneTemplate = document.importNode($templateCardEdit, true)]
    Y lo añadimos al $fragment
Una vez terminado cada producto añadimos el frgament al DOM.
*/

function showAllEdit(products, category){
    const $category = document.getElementById(`${category}`)
    const $templateCardEdit = document.getElementById("templateCardEdit").content;
    const $cardContainer = $category.querySelector(".cards__container");
    const $fragment = document.createDocumentFragment();
    products.forEach(product=>{
        $templateCardEdit.querySelector(".card__img").setAttribute("class",`card__img card__img--${product.id}`)
        $templateCardEdit.querySelector(`.card__img--${product.id}`).style.backgroundImage = `url("${product.img}")`;
        $templateCardEdit.querySelector(".card__tittle").textContent=sizeName(product.name);
        $templateCardEdit.querySelector(".card__subTittle").textContent=`$ ${product.price}`;
        $templateCardEdit.getElementById("editBtn").setAttribute("href", `../screens/add.html?id=${product.id}`)
        $templateCardEdit.querySelector(".removeBtn").setAttribute(`data-id`, `${product.id}`)
        const $cloneTemplate = document.importNode($templateCardEdit, true)
        $cardContainer.appendChild($cloneTemplate);
        $fragment.appendChild($cloneTemplate)
    })
    $cardContainer.appendChild($fragment);
}


/*
Acortaremos un poco el nombre para que no se muestre en dos lineas
Si el nombre es mayor a 15 caracteres, haremos.
    1. buscaremos el ultimo espacio para separar ahí el nombre.
        1. En caso de no tener espacios, mostramos solo 15 caracteres.
        2. En caso de si tener espacio, mostraremos el nombre hasta el ultimo espacio.
 */
function sizeName(name){
    if(name.length>15){
        if (name.lastIndexOf(` `)===-1){
            return `${name.slice(0,15)}...`
        }else{
            return `${name.slice(0,name.lastIndexOf(" "))}...`
        }
    }
    else    
        return name;
}


export {addContenCategory ,addContentCard, addCategory, showError, showAll, showAllCat, showAllEdit}