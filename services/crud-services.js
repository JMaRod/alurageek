const url = `http://localhost:3000/products`;
const urlUsers = `http://localhost:3000/users`

/*
Vamos a obtener la ruta de la página con [window.location.href;] y después vamos a sacar la página actual Después sacamos la página actual de la ruta para quedarnos con el localhost y también como en este caso tenemos todas las páginas en la misma carpeta, nos quedamos con la ruta de la carpeta para al final tener algo como [localhost:puerto/carpeta/] para en un proceso posterior añadir la página a la que queremos ir como add.html
*/
const $idParam = window.location.href;
const $idParamMod = $idParam.slice(0,($idParam.lastIndexOf("/")+1));


/**
Con esta función vamos a obtener todos los datos del products.json
la variable allProducts va a servir para guardar para el arreglo con formato json de los datos obtenidos, 
el try y catch se ponen cuando se trabaja con funciones async esto es porque, estas funciones esperan una respuesta si no se las damos podemos tener problemas, es por eso que tenemos que trabajar con el error

en el try ponemos lo que queremos se haga cuando se obtenga un promesa correcta, AWAIT sirve para indicar que el programa espere por una promesa(cuando se cumpla esta misma se procede).
res guarda los datos en "bruto" y con. json lo pasamos a un objeto json.
si el resultado de todo esto es positivo(!res.ok) regresamos un arreglo con los todos los productos
si el resultado es negativo lanzamos {status:res.status, satatusText:res.statusText}

el catch atrapa este error y lo maneja 
error.statusText || `Ocurrio un error` con esto podemos dar un valor por default, en caso de no tener un texto de error, mandaremos el mensaje de error `ocurrió un error`.
 */
const getProducts = async ()=>{
    let allProducts=[];
    try{
        let res = await fetch(url), 
        json = await res.json();
        if (!res.ok) throw {status:res.status, satatusText:res.statusText}
            allProducts=json;

    }catch(error){
        let message = error.statusText || `Ocurrio un error`
        console.log(`error obteniendo los datos. codgigo de error: ${error.status}:${message}`)
    }
    return allProducts;

}

/*
La función crud se encarga se hacer un ingreso "PUT", actualización "POST", o eliminar "DELETE", de los productos en productos.json

Para distinguir sobre cual función hacer, recive un segundo parametro que tiene la acción a realizar [create="POST", update="PUT", delete="DELETE"]

Como se requiere un objeto option con diversos valores que dependen de la función a realizar, 
    Creamos uno a modo de template que después modificaremos, lo primero es llenar el METHOD con una de las tres opciones,
    Headers no cambia y se usara el mismo en las tres acciones, 
    Para "POST" y "PUT", hay que llenar el body, que es el contenido de cada objeto json de productos.json, para llenarlo usaremos el primer parámetro que recibe esta función (product).
    Para el method "POST" hay que mandar la url de la productos.json por lo tanto no requieren más cambios.
    Para el method "PUT" hay que añadir a la url/id (el id del producto que se va a modificar). 
    Para el method "DELETE" hay que añadir a la url/id (el id del producto a eliminar) y además hay que eliminar el body de options para lo que usamos [delete options.body;]
En caso de que exista un error en las acciones añadiremos un [if (!res.ok) throw {status:res.status, satatusText:res.statusText}] con el throw que después capturara el catch.
En el catch capturaremos el error.

Muy importante por default el plugin liveServer recarga la página cuando se cambia la base de datos [en este caso productos.json] por lo tanto afectaba el comportamiento que se programó, pues por default recarga en la página montada en su servidor [ en nuestro caso localhost:5500/pagina], por lo tanto como queremos que después de añadir o actualizar regrese a la página de admin, tendremos que poner toda la ruta de la página con el localhost sin embargo no siempre se va a saber esta información por lo tanto se obtuvo la dirección "principal" y después se le añade la página a donde queremos ir [window.location.replace(`${$idParamMod}admin.html`);]
*/
async function crud(product, acction){
    if(acction == "create"){
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type":"application/json; charset=utf-8",
                },
                body:JSON.stringify(product),
            },
            res = await fetch("http://localhost:3000/products", options),
            json = await res.json();
            
            if(!res.ok)
                { throw { statuts: res.status, statusText: res.statusText };}

            window.location.replace(`${$idParamMod}admin.html`);
        } catch (error) {
            let message = error.satatusText || "Ocurrió un error";
            console.warn("Error en POST:", message);
        }
    }else if (acction == "update"){
        try {
            let options = {
                method: "PUT",
                headers: {
                    "Content-type":"application/json; charset=utf-8",
                },
                body:JSON.stringify(product),
            };
            let res = await fetch(`${url}/${product.id}`, options);
            let json = await res.json();
            if(!res.ok)
                throw { statuts: res.status, statusText: res.statusText };
                
            window.location.replace(`${$idParamMod}admin.html`);
        } catch (error) {
            let message = error.satatusText || "Ocurrió un error";
            console.log("Error en PUT", message)
        }
    }else if (acction == "delete"){
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type":"application/json; charset=utf-8",
                },
            };
            let res = await fetch(`${url}/${product.id}`, options);
            let json = await res.json();
            if(res.ok===false)
                throw { statuts: res.status, statusText: res.statusText };
                
            location.reload();
        } catch (error) {
            let message = error.satatusText || "Ocurrió un error";
            console.log("Error en DELETEs", message)
        }
    }
}

/*
Esta funcion es para leer los datos de los usuarios
*/
async function readUser(){
    let status=false;
    let res,json;
    try {
        res = await fetch(urlUsers);
        json = await res.json();
        if (!res.ok) 
            throw {status:res.status, satatusText:res.statusText}
        
        status = true;
    } catch (error){
        let message = error.statusText || `Ocurrio un error`
        console.log(`error obteniendo a los usuarios. codgigo de error: ${error.status}:${message}`);
    }
    let returnObj = {json,status}
    return returnObj;
}


export {getProducts, crud, readUser}
