document.querySelector(".addParam").addEventListener("click", addParam);
document.querySelector(".showResults").addEventListener("click", showResults);

var parametros = [];
var valores = [];

function addParam() {
  let html = document.querySelector(".container").innerHTML;
  let newHTML = '<div><input type="text" class="parametro" placeholder="parametro"><input type="number" class="valor" placeholder="valor"></div>';
  document.querySelector(".container").innerHTML = html + newHTML;
}


function showResults() {
  for (var i = 0; i < document.querySelectorAll('.parametro').length; i++) {
    parametros.push(document.querySelectorAll('.parametro')[i].value);
    valores.push(parseInt(document.querySelectorAll(".valor")[i].value));
  }
  var data = [{
    x: parametros,
    y: valores,
    type: "linear"
  }];
  Plotly.newPlot("grafico", data);
}

let informacion = []
let columnas = ['identificadorParametro', 'identificadorValor']

function datos() {
  let input1 = document.getElementById('identificadorParametro')
  let input2 = document.getElementById('identificadorValor')
  let dato = {
    IdentificadorParametro: input1.value,
    IdentificadorValor: input2.value,
  }
  if (localStorage.getItem('Tareas') != null) {
    informacion = JSON.parse(localStorage.getItem('Tareas'))
    informacion.push(dato)
    localStorage.setItem('Tareas', JSON.stringify(informacion))
    input1.value = ''
    input2.value = ''
    document.querySelector('table').remove()
    document.querySelector('h1').remove()

  } else {
    informacion.push(dato)
    localStorage.setItem('Tareas', JSON.stringify(informacion))
    input1.value = ''
    input2.value = ''
    document.querySelector('table').remove()
    document.querySelector('h1').remove()
  }
}