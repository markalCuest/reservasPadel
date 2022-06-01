//Sacamos todos los elementos del formulario para trabajar con ellos
const form = document.querySelector("form");

/*
const dia = document.getElementById("dia");
const errordia = document.getElementById("errordia");

const hora = document.getElementById("hora");
const errorhora = document.getElementById("errorhora");

const pista = document.getElementById("pista");
const errorpista = document.getElementById("errorpista");

const listadoTabla = document.getElementById("listadoTabla");
const tabla = document.getElementsByClassName("tabla");
*/

function validateForm() {

    var comprobar = true;

    //   if (dia.value === "") {
    //     comprobar = false;
    //     errordia.style.color = "red";
    //     errordia.textContent = "Debes seleccionar una fecha";

    //   } else {
    //     errordia.remove();
    //   }

    //   if (hora.value === "") {
    //     comprobar = false;
    //     errorhora.style.color = "red";
    //     errorhora.textContent = "Debes insertaruna hora";

    //   } else {
    //     errorhora.remove();
    //   }

    //   if (pista.value == "Selecione el número de pista") {
    //     comprobar = false
    //     errorpista.style.color = "red";
    //     errorpista.textContent = "No puedes enviar la opcion por defecto";

    //   } else {
    //     errorpista.remove();
    //   }

    console.log(comprobar);

    if (comprobar == true) {
        mostrarTabla();
    }

}

function mostrarTabla() {
    alert("Reserva realizada con exito");
    
}