import { validate, validateButton, validateResult } from "../services/validate.js";
import { formContactInputs, formBtn } from "./formContact-controller.js";
import {getProducts, crud} from "../services/crud-services.js"
import { searchBtn, searchBtnSmart } from "./nav-buttons.js";


const formsAddinput = document.querySelectorAll(".form__input__add");
const submitBtnAdd = document.getElementById("submitAdd");
const submitCancel = document.getElementById("submitCancel");

/*
$idParam obtiene la url de la página.
$id obtiene el "id" de la url (obtiene lo que esta después de ¿id=).
$formAdd tiene el formulario para agregar productos (que también vamos a usar para editar)
*/
const $idParam = new URLSearchParams(document.location.search);
const $id = $idParam.get("id");
const $formAdd = document.querySelector(".form__add") 

/*
Esta funcion autollenara el formulario en caso de tener un producto existente.
Tambien recive un argumento [imgPreview] para saber si el producto tiene una imagen que cambiar en preview
[product=[]] es la variable que guradará el producto en caso de existir.
    1. Llamamos a [loadProduct()] para que busque el producto.
    2. Preguntamos si el [product] es diferente de null (existe).
        3. pregunta si [imgPreview] tiene un valor para cambiar o no.
            4. Si no hay una imagen para cambiar el la preview, se pasa el [product] tal como  esta,
            5. En cso de no estar vacio [imgPreview], se llena el valor de [product.img] con ese valor de preview.
*/
async function showEdit(imgPreview){
    let product=[];
    product = await loadProduct()
    if (product!=null){
        if(imgPreview==null){
            fillForm(product)
        }else {
            product.img=imgPreview;
            fillForm(product)
        }
    }
    
}

/*
Obtenemos todos los productos con ayuda de getProducts(), 
después verificamos que el id no este vacío, lo que indica que vamos a añadir un producto nuevo
En caso de si tener un id lo compararemos con cada uno de los productos hasta encontrar el que tenga el mismo id, y mandamos llamar el fillForm con el producto deseado
 */
async function loadProduct(){
    let productToEdit;
    if ($id!=null){
            const products = await getProducts();
            products.forEach(product => {
            if(product.id==$id){
                productToEdit=product;
            }
        })
    }
    return productToEdit; 
}

function mainEdit(){
    showEdit();
}mainEdit();

/*
Con fillForm vamos a llenar los campos del formulario
$formAdd ya la teníamos desde el inicio, para acceder a los valores de los diferentes inputs del formulario usaremos los [$formAdd.datasetdelcampo.value] y con [product.algo] obtenemos el valor que le asignaremos.
 */
function fillForm(product){
    $formAdd.imgProduct.value = product.img;
    if(product.category!=null){
        $formAdd.categoryProduct.value = product.category;
        $formAdd.nameProduct.value = quitDot(product.name);
        $formAdd.priceProduct.value = product.price;
        $formAdd.descriptionProduct.value = product.description;
    }
    
    imgPreviewValue(product)
}

/*
Esta función obtiene el valor de la imagen preview
Recibe un [product] como parametro.
1. Obtenemos el lugar donde  va a poner la imagen.
2. Modificamos el valor de la imagen con el [setAttribute].
3. Guaradamos el valor obtenido en el [product.img] 
*/
function imgPreviewValue(product){
    let $previewImg = document.getElementById(`previewShow`)
    $previewImg.setAttribute(`src`,`${product.img}`)
    $previewImg = document.getElementById(`previewShow`)
    product.img = $previewImg;
}


/*
Aquí se va a guardar el product en el json
Recibe una imgaen como parametro.
1. En caso de que la imagen este vacia [null].
    1. Se guarda el [product] tal caul esta, para esto se llenan los valores del objeto [product] con los datos que esten en el form.
2. Revisamos si estamos editando [$id!=null] o crando un objeto nuevo [$id==null].
    1. En caso de que no estemos editando un producto (es decir que [$id==null]) se manda a crear el nuevo objeto [product] en el json, para lo que se manda a llamar a la función crud y se le manda el producto y la cadena [create], como parametros.
    2. En caso de estar editando [$id!=null], se llama a la función crud, y se le mandan comoo argumentos el producto y la cadena `update`.
*/
async function makeCrud(img){
    let product;

    if(img==null){
        product = {
            "img": $formAdd.imgProduct.value,
            "category": $formAdd.categoryProduct.value,
            "name": $formAdd.nameProduct.value,
            "price": $formAdd.priceProduct.value,
            "description": $formAdd.descriptionProduct.value
        }
    }
    if($id==null){
        await crud(product,"create")
    }else {
        product.id=$id;
        await crud(product, "update")
    } 
}

/*
Con esto vamos a estar revisando los inputs de los formularios, los eventos a revisar son cuando se cambie con el click a otro input o cuando se esté tecleando.
*/
formsAddinput.forEach ( ( input ) => {
    if (input!=imgProduct){
        input.addEventListener("click", (input) => {
            validate( input.target );
            validateResult( input.target );
        })
        input.addEventListener("keyup", (input) => {
            validate( input.target );
            validateResult ( input.target );
        })
    }

    if (input==imgProductShow){
        let product=[];
        input.addEventListener("change", (input) => {
            let $imgPreview = input.target.value;
            $imgPreview = $imgPreview.slice($imgPreview.lastIndexOf(`\\`)+1, $imgPreview.length);
            $imgPreview = `/assets/img/store/`+$imgPreview;
            product.img=$imgPreview;
            showEdit($imgPreview);
            fillForm(product)    
        })
    }
});

/* Para el botón de enviar mensaje se revisara el evento cuando se le da click  */
submitBtnAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    if (validateButton("form__input__add")) {
        await makeCrud(null);
        alert("La operación se realizo con éxito");
    }
});

/* Boton para cancelar */
submitCancel.addEventListener("click", event=>{
    event.preventDefault();
    location.href = "../screens/admin.html"
})

/*
Metodo para quitar `...` de la cadena de texto en los nombres que son muy largos
*/
function quitDot(nombre){
    let lengthName = nombre.length;  
    if (nombre.includes(`...`))
        return nombre.slice(0, lengthName-3);
    else    
        return nombre;
}



