/* importamos las funciones que vamos a usar */
import	{ addCategory, showError} from "../services/show.js"
export{getAll, searchCategories, }

/*
Es la funcion que obtendra el contenido del json externo
Es una funcion asincrona para evitar que en caso de no obtener respuesta de la API, el programa se quede congelado, englobamos en un try (siempre se have con fetch, para manejar los errores de conexion)
1. creamos una variable para guardar la respuesta del fetch,
2. con .ok revisamos que la respuesta sea correcta
    en caso contrario revisamos si el error el codigo es 401(indica que si encuentra la API pero no el recurso solicitado), o 404 (que es error de conexion)
3.atrapamos el error y lo mostramos en consola ademas de mandarlo a imprimir
*/
const getAll = async ()=>{
    let json;
    try{
        const response = await fetch("http://localhost:3000/products/");
        //comprobamos la respuesta con response.ok y verificacamos codigos de error exactos
        if (response.ok){
            json = await response.json();
        } else if ( response.status === 401){
            json = "401";
        }else if( response.status === 404){
            json = "404";        }
        
    }catch (err){
        console.log("error leyendo fetch ", err)
    }
    return json;
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
function searchCategories(data){
    let categories = [];
    data.forEach(element => {
        if(!categories.includes(element.category))  
            categories.push(element.category)
    });
    return categories;
}

/*
mostramos todos los productos con sus categorias
recibimos el arreglo de categorias y el arreglo que contiene todos los arreglos
1. cramos un arreglo que guardara todos los productos que tienen la misma categoria
2. para cada elemento de categories haremos,
    *que cada elemento de products haga,
        +comparamos que la categoria del elemento de Producto(elementProd.category), contenga el elemento de categoria(elementCat)--es decir que compraramos si el producto tiene la misma categoria que estamos revisando para saber si pertenece a la misma categoria--
        +si es afirmativo, metemos el elemento de producto (elementProd) en el arreglo show
        Cat que sera la coleccion de productos a mostrar,
    *mandamos llamar a la funcion que mostrar todos los elementos que tengan la misma categoria
    *vaciamos el showCat que es el arreglo para mostrar, para que se añadan otros productos con una categoria diferente
*/
function showAllCat(categories, products){
    let showCat=[];
    categories.forEach(elementCat=>{
        products.forEach(elementProd=>{
            if(elementProd.category==elementCat)
                showCat.push(elementProd)            
        })
        temporalShow(showCat);
        showCat=[];
    });
}

/*
es la funcion que mostrara los productos recibe una coleccion de productos
1. mandamos llamar a la funcion que crea una categoria y le mandamos la categoria del elemento [0] con      product[0].category(solo llamamos al primero elemento pues es un arreglo con los productos de la misma categoria)
2. para cada elemento de la coleccion de products mandamos agregar el contenido con addContent y le mandamos la el producto actual y la categoria
*/
function temporalShow(products){
    addCategory(products[0].category)
    products.forEach(product=>{
        addContent(product, products[0].category)
    });
}

/*
esta funcion mostrara todos los elementos con sus respectivas categorias
la const products es await porque espera una respuesta por lo mismo showAll es asincrona
1. verificamos que no tengamos codigos de errores o que productos sea null y mandamos a imprimir el error
2. en caso de no tener errores llamamos la funcion que busca las categorias y le mandamos la coleccion de prodictos
3. despues llamamamos la funcion que imprime los productos con sus respectivasa categorias
 */
async function showAll(){
    const products = await getAll();
    if(!products=="401"||products=="404"||products==null){
        showError(products)
    }else{
        const categories = searchCategory(products)
        showAllCat(categories, products)
    }
    return products;
}

