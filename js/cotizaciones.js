const lista = document.querySelector('#listado')

crearLista('../js/datos.json');

async function crearLista(file) {
    let jsonDatos = await fetch(file);
    let listaDatos = await jsonDatos.text();
    document.getElementById("prueba").innerHTML = JSON.parse(listaDatos);
  }

async function recopilarDatos(){
await fetch('../js/datos.json')
    .then( (res) => res.json())
    .then ( (datos) => {

        datos.forEach((producto) => {
            const li = document.createElement('li')
            li.innerHTML = `
                    <img ${producto.imagenDeProducto} class="cotizaciones__imagenes" alt="${producto.nombreDeProducto}">
                    <div class="cotizaciones__text">         
                    <h3 class="cotizaciones__name">${producto.nombreDeProducto}</h3>
                    <p class="cotizaciones__descripcion">Descripcion: ${producto.descripcionDeProducto}</p>
                    </div>
                    <div class="cotizaciones_precio">
                    <input id="numeroArticulo${producto.idDeProducto}" class="eventoEnter" type="number" placeholder="0">
                    </div>
                    <p id="textoArticulo${producto.idDeProducto}" class="precioArticulo"></p>
                `
            li.classList.add('cotizaciones__item');
            lista.append(li);
            numeroArticulo="numeroArticulo"+producto.idDeProducto;
            numeroGuardado="numeroGuardado"+producto.idDeProducto;
            document.getElementById(numeroArticulo).value=parseInt(JSON.parse(localStorage.getItem("numeroGuardado1")));
        });
    });
};

// function crearVariablesDeArticulos(){
//     var numeroDeArticulo = [];
//     var cantidadTotalDeArticulos=10;
//     for (var idDeArticulo = 1; idDeArticulo <= cantidadTotalDeArticulos; ++idDeArticulo) {
//         numeroDeArticulo[idDeArticulo] = idDeArticulo;
//     }
    
//     console.log(numeroDeArticulo);
//     return numeroDeArticulo;
//     }

// var cantidadTotalDeArticulos=10;
// alert (cantidadTotalDeArticulos);
// for (var numeroSequencia = 1; numeroSequencia < cantidadTotalDeArticulos; numeroSequencia++) { 
//     window["precioTotalArticulo"+numeroSequencia] = new Object(numeroSequencia);
//     window["numeroArticulo"+numeroSequencia] = new Object(numeroSequencia);
// }

let botonRegistro;
    botonRegistro=document.getElementById("botonCotizacionesArticulos");
    botonRegistro.onclick = function () {
    obtenerNumero()
};

/*
document.getElementById("numeroArticulo1").value=parseInt(JSON.parse(localStorage.getItem("numeroGuardado1")));
document.getElementById("numeroArticulo2").value=parseInt(JSON.parse(localStorage.getItem("numeroGuardado2")));
document.getElementById("numeroArticulo3").value=parseInt(JSON.parse(localStorage.getItem("numeroGuardado3")));
document.getElementById("numeroArticulo4").value=parseInt(JSON.parse(localStorage.getItem("numeroGuardado4")));    
*/

/*
let productoGenerico = document.getElementsByClassName("cotizaciones__name");
for (let numeroDeProductosGenericos = 0; numeroDeProductosGenericos < productoGenerico.length; numeroDeProductosGenericos++) {
let indice=productos.findIndex(productos => productos.id === numeroDeProductosGenericos+1);
let nombreDeProductoGenerico=eliminarComillas(JSON.stringify(productos[indice].nombreDeProducto));
productoGenerico[numeroDeProductosGenericos].innerHTML = nombreDeProductoGenerico;
}
*/

function eliminarComillas(palabraConComillas) {
    let palabraSinComillas;
    palabraSinComillas=palabraConComillas.replaceAll('"','');
    return palabraSinComillas;
};

async function obtenerNumero() {

    var cantidadTotalDeArticulos=10;
    for (var numeroSequencia = 1; numeroSequencia < cantidadTotalDeArticulos; numeroSequencia++) { 
        window["precioTotalArticulo"+numeroSequencia] = new Object(numeroSequencia);
        window["numeroArticulo"+numeroSequencia] = new Object(numeroSequencia);
    }

    let precioTotalTodosLosArticulos;
    let textoArticulo;
    let numeroGuardado;
    let identificadorDeNumeroGuardado;
    await fetch('../js/datos.json')
    .then( (res) => res.json())
    .then ( (datos) => {


        datos.forEach((producto) => {

            numeroArticuloParaFormula = "numeroArticulo"+producto.idDeProducto;
            numeroArticuloCotizacion = document.getElementById(numeroArticuloParaFormula).value;
            numeroArticuloCotizacion = parseFloat(numeroArticuloCotizacion);
            let texto;
            if (isNaN(numeroArticuloCotizacion)) {
            texto = "No Valido";
            precioTotalArticulo1=0;
            } else if (Number.isInteger(numeroArticuloCotizacion) && numeroArticuloCotizacion>=parseInt(0)) {
            texto = "El costo de "+numeroArticuloCotizacion+" baños es de "+numeroArticuloCotizacion*producto.precioDeProducto+" pesos.";
            window["precioTotalArticulo"+producto.idDeProducto]=numeroArticuloCotizacion*producto.precioDeProducto;
            } else  {
                texto = "El numero tiene que ser positivo y entero.";
            }
            textoArticulo="textoArticulo"+producto.idDeProducto;
            document.getElementById(textoArticulo).innerHTML = texto;
            textoPrecioTotal="El costo de todos los articulos es de "+precioTotalTodosLosArticulos+" pesos.";
            document.getElementById("cotizaciones_precio_total").innerHTML = textoPrecioTotal;
            numeroGuardado="numeroGuardado"+producto.idDeProducto;
            localStorage.setItem(numeroGuardado,JSON.stringify(numeroArticuloCotizacion));
            identificadorDeNumeroGuardado="identificadorDeNumeroGuardado"+producto.idDeProducto;
            localStorage.setItem(identificadorDeNumeroGuardado,JSON.stringify(texto));
        });
    });
};