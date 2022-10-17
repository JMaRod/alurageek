import { validate, validateButton, validateResult } from "/services/validate.js";
import { formContactInputs } from "/controller/formContact-controller.js"
import { readUser } from "/services/crud-services.js";
import { searchBtn, searchBtnSmart } from "./nav-buttons.js";

const formLoginInputs = document.querySelectorAll(".form__input__login");
/* Obtenemos todos los inputs del form de contacto  */
const formLoginBtn = document.querySelector("#submit__login");
/* Obtenemos el botón     */

/* Para cada input vamos a revisar su contenido para estar validando, se validaran en dos eventos con blur cuando el focus se salga del input y keyup para cada que se suelta una tecla del teclado (para revisar mientras que se esta escribiendo) */
formLoginInputs.forEach((input) =>{
    input.addEventListener("click", (input) => {
        validate(input.target);
        validateResult( input.target );
    })
    input.addEventListener("keyup", (input) => {
        validate(input.target);
        validateResult( input.target );
    })
});

/* 
Para el botón login se revisará el evento cuando se le da click, es async porque esperamos los resultados del crud para users  
    Se manda a revisar que todos los campos están correctamente llenados, en caso de ser negativo se      detiene el proceso.
    Con [let userObj = await readUser()] se pide la lista de usuarios esta función es await. esta función regresara un objeto con dos elemento uno es json que son la lista de usuarios y sus contraseñas y el otro es elemento del objeto es status que indica si la lectura de los usuarios fue correcta.
    Con [if (userObj.status)] verificamos que la lectura fue correcta y procedemos con la función.
    con [let resultCheck = checkLogin(userObj.json)] mandamos a revisar si los datos son correctos, es deciar aqui revisaremos si el email y la contraseña escrita son correctos o no.
    Con [showMessage(resultCheck)] mandamos a imprimir los mensajes del proceso de login.
*/
formLoginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!validateButton("form__input__login")) {
        alert("Error en login")
        return
    }
    let userObj = await readUser()
    let resultCheck = checkLogin(userObj.json)
    if (userObj.status){
        showMessage(resultCheck)
    }else{
        console.log("error obtiendo datos")
    }
});

/*
Revisamos si el email y el password ingresado son correctos.
    Creamos un arreglo con tres valores que indican cada uno de los valores del login.
    Creamos las variables para obtener los datos ingresados.
        [let $formEmail = document.getElementById("email").value;
        let $formPass = document.getElementById("pass").value;].
    Con users.forEach(user=> revisaremos que el email ingresado sea igual a alguno de la lista de usuarios para eso usamos [(user.email.includes($formEmail))].
    En caso de encontrar un email verificaremos si el password es correcto con [(user.pass.includes($formPass)]
    Con estas verificaciones podremos tener tres opciones.
            En caso de que la contraseña y el password estén correctos cambiaremos el valor de loginSucces, loginEmail y loginPass a true
            En caso de que el email este correcto pero no el password cambiaremos el loginEmail a true
            En caso de no tener un email que coincida con alguno de la lista de usuarios, no modificaremos los valores y mandaremos todos en falso.
*/
function checkLogin(users){
    let loginResult={
        "loginSucces":"false",
        "loginEmail":"false",
        "loginPass":"false"
    }
    let $formEmail = document.getElementById("email").value;
    let $formPass = document.getElementById("pass").value;
    users.forEach(user=>{
        if (user.email==$formEmail){
            if(user.pass == $formPass){
                loginResult.loginSucces=true;
                loginResult.loginEmail=true;
                loginResult.loginPass=true;
                return loginResult;
            }
            else{
                loginResult.loginEmail=true;
                return loginResult
            }
        }
        return loginResult;
    });
    return loginResult;
}

/*
Aquí se mostrarán los mensajes dependiendo de los resultados de checkLogin
*/
function showMessage(results){
    if (results.loginSucces==true){
        alert("Login correcto")
        window.location.href="/screens/admin.html"
    }
        
    else{
        if (results.loginEmail==true)
            alert("Password incorrecto")
        else   
            alert("No es un email registrado")
    } 
        
}
