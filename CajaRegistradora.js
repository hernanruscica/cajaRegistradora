
/* ENUNCIADO TRADUCIDO
Caja Registradora (https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register)

Diseñar una funcion de caja registradora checkCashRegister() que acepte el precio de compra como 
primer parametro (price), pago como segundo parametro (cash), y efectivo en la caja (cid) 
como tercer parametro.

cid es un arreglo de dos dimensiones listando "el efectivo disponible" en la caja.

La funcion checkCashRegister() siempre deberia retornar un objeto con un key "status"  y un key "change".

Retornar {status: "INSUFFICIENT_FUNDS", change: []} si el "efectivo en la caja" es menor que el 
"cambio debido", o si no puedes retornar el cambio exacto.

Retornar {status: "CLOSED", change: [...]} con "efectivo en la caja" como el valor para la 
key "cambio" si este es igual a el "cambio debido".

De otra manera, retornar {status: "OPEN", change: [...]}, con el "cambio debido" en monedas y billetes,
ordenados de mayor a menor, con el valor de "cambio".
*/   

//efectivo en caja con comas...
//nombre de la divisa,  cantidad de efectivo de esa divisa
let ejemploEfectivoEnCaja = [
    ["PENNY", 1.01],
    ["NICKEL", 0.55],
    ["DIME", 5.2],
    ["QUARTER", 5.75],
    ["ONE", 33],
    ["FIVE", 25],
    ["TEN", 80],
    ["TWENTY", 180],
    ["ONE HUNDRED", 400]
  ]

  //divisas con comas...
const divisas = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
]
  
function sacarComas(efectivoArray){   
    const temp = [...efectivoArray];
    temp.forEach(divisa => divisa[1] = Math.trunc(parseFloat(divisa[1] * 100)));
    return temp
}

function ponerComas(efectivoArray){
    const temp = [...efectivoArray];
    temp.forEach(divisa => divisa[1] = parseFloat(divisa[1] / 100));
    return temp;
}
/**/
const divisasSinComas = sacarComas(divisas);
/*
const ejemploEfectivoEnCajaSinComas = sacarComas(ejemploEfectivoEnCaja)
*/
//console.log(divisasSinComas, ejemploEfectivoEnCajaSinComas);


function calcularTotalEfectivoEnCaja(efectivoEnCaja){
    let acumuladorEfectivo = 0;
    efectivoEnCaja.forEach((efectivoValor) => acumuladorEfectivo += efectivoValor[1]);
    return acumuladorEfectivo  
}

//console.log(calcularTotalEfectivoEnCaja(ejemploEfectivoEnCajaSinComas));

function calcularCambioDebido(pago, precio){
    if (precio > pago) return -1;
    let cambio = Number.parseFloat(pago - precio).toFixed(2);
    return cambio;
}
//console.log(calcularCambioDebido(100, 5));

 
/*Se le pasa: 
    -El cambio que hay que dar en centavos. 
    -"divisas", que es un array con el nombre y el valor de la unidad de cada divisa. 
    -El efectivo que hay en la caja actualmente.
    La funcion arma el vuelto (cambio a dar), en base a lo que hay en la caja.
    si no alcanza, retorna "false", puede ser por falta de divisas o total de dinero
*/
function sacarCambio(cambio, divisas, efectivoPasado){      
    const longitudDivisas = divisas.length - 1;    
    const cambioAdar = [];   
    const efectivo = [...efectivoPasado];
    const efectivoSinTocar = [...efectivoPasado];
    //console.log(efectivoPasado);
    const buscarLaDivisa = (nombreDivisa, efectivo) => {      
        //console.log(nombreDivisa);
        //console.log(efectivo);
        let encontrada = false;
        let indiceEncontrada = 0;
        efectivo.forEach((efectivo, indice) => {
            let nombreDivisaActual = efectivo[0];

            if ( nombreDivisaActual === nombreDivisa){
                encontrada = true;
                indiceEncontrada = indice;
            }
        });
        //console.log(encontrada, indiceEncontrada);
        return [encontrada, indiceEncontrada];
    }
    //console.log(buscarLaDivisa("ONE", [["ONE", 2],["PENNY", 12]])); //retorna [true, 0]

    for (i = longitudDivisas; i >= 0; i--){     
        let valorEfectivoActual = efectivo[i][1];
        let valorDivisaActual = divisas[i][1];
        let nombreDivisaActual = divisas[i][0];

        while (valorEfectivoActual > 0 && cambio > 0 && cambio >= valorDivisaActual){

            valorEfectivoActual -= valorDivisaActual;
            cambio -= valorDivisaActual; 

            let resultadoBusqueda = buscarLaDivisa(nombreDivisaActual, cambioAdar);
            let indiceResultadoBusqueda = resultadoBusqueda[1];
            let estaLaDivisa = resultadoBusqueda[0]; 

            if (!estaLaDivisa) cambioAdar.push([nombreDivisaActual, valorDivisaActual]);             
            else cambioAdar[indiceResultadoBusqueda][1] += valorDivisaActual; 
        }
    }

    //return (cambio == 0.00)?[cambioAdar, true, efectivo]:[cambioAdar, false, efectivoSinTocar]; 
    if (cambio == 0.00) {
        return [cambioAdar, true]
    } else {
        return [cambioAdar, false]
    }
}
//console.log(sacarCambio(9,5, divisasSinComas, sacarComas(ejemploEfectivoEnCaja)));

//actualiza la cantidad de efectivo en la caja, despues de haber podido dar un vuelto.
//la segunda variable es lo que se tiene que sacar de la caja. Retorna la nueva caja
//recibe todo en centavos
function actualizarEfectivoEnCaja(efectivoEnCajaAnterior, actualizacionCaja){    
    for (let i = 0; i < efectivoEnCajaAnterior.length; i++){
        for (let j = 0; j < actualizacionCaja.length; j++){
            if (efectivoEnCajaAnterior[i][0] == actualizacionCaja[j][0]) {                
                if (efectivoEnCajaAnterior[i][1] > 0) efectivoEnCajaAnterior[i][1] -= actualizacionCaja[j][1];                     
            }
        }
    }   
    return efectivoEnCajaAnterior;
}
/*
console.log(actualizarEfectivoEnCaja([["PENNY", 1], ["NICKEL", 205], ["DIME", 31], ["QUARTER", 425], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
, [["TEN", 10], ["FIVE", 5], ["ONE", 20], ["QUARTER", 275], ["DIME", 20]]));
*/

/***************************** HASTA ACA REVISADO **********************************************************/

//Funcion principal, recibe los valores con decimales, dentro se los quita con la funcion sacarComas();
function revisarCajaRegistradora(precioCompraPasado, pagoEfectuadoPasado, efectivoEnCajaPasado){    
    
    let precioCompra = Math.trunc(parseFloat(precioCompraPasado*100));
    let pagoEfectuado = Math.trunc(parseFloat(pagoEfectuadoPasado*100));
    let efectivoEnCaja = sacarComas(efectivoEnCajaPasado);     
    
    if (precioCompra > pagoEfectuado) return {estado: "PAGO_INSUFICIENTE", cambio: [], estadoCaja: efectivoEnCaja};
    
    let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(efectivoEnCaja);
    let cambioDebido = calcularCambioDebido(pagoEfectuado,  precioCompra);    

    console.log(`total cambio en caja: ${totalEfectivoEnCaja} cambio debido: ${cambioDebido}`);
    
    let resultadoSacarCambio = sacarCambio(cambioDebido, divisasSinComas, efectivoEnCaja);    
    let tengoCambioExacto = resultadoSacarCambio[1];
    let cambioExacto = resultadoSacarCambio[0]; 

    /*determino el estado a retornar  - problema con SALDOS_INSUFICIENTES_CAMBIO sigue descontando aunque no pueda dar el cambio por falta de billetes*/
    if (totalEfectivoEnCaja < cambioDebido) return {estado: "SALDOS_INSUFICIENTES", cambio: [], estadoCaja: ponerComas(efectivoEnCaja)};    
    if (totalEfectivoEnCaja === cambioDebido) return {estado: "CAJA_CERRADA", cambio: ponerComas(cambioExacto), estadoCaja: actualizarEfectivoEnCaja(efectivoEnCaja, cambioExacto)};
    if (!tengoCambioExacto) {          
        return {estado: "SALDOS_INSUFICIENTES_CAMBIO", cambio: [], estadoCaja: ponerComas(efectivoEnCaja)};
        }
    //esta ultima actualizacion del estado de la caja registradora no lo piden en el ejercicio.     
    let estadoCajaConComas = ponerComas(actualizarEfectivoEnCaja(efectivoEnCaja, cambioExacto));   
    let cambioExactoConComas = ponerComas(cambioExacto);
    return {
        estado: 'OPEN',
        cambio: cambioExactoConComas, 
        estadoCaja: estadoCajaConComas
    }    
}
//console.log(revisarCajaRegistradora(1, 1.25, ejemploEfectivoEnCaja));



/***********************************hasta aca controlado **********************************/


/* TODAS LAS PRUEBAS DE FREECODECAMP PASADAS !! */
//console.log(revisarCajaRegistradora(0.5, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]] ));
//console.log(revisarCajaRegistradora( 3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(ejemploEfectivoEnCaja);

function darVuelto(compraValorId, pagoValorId){
    const $compraValorId = document.getElementById(compraValorId);
    const $pagoValorId = document.getElementById(pagoValorId);  
    const efectivoEnCaja = [...ejemploEfectivoEnCaja];

    let valorCompra = parseFloat($compraValorId.value);
    let valorPago = parseFloat($pagoValorId.value);
    let cambioDebido = calcularCambioDebido(valorPago, valorCompra);
    let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(efectivoEnCaja);    
    const resultadoRevisarCajaRegistradora = revisarCajaRegistradora(valorCompra, valorPago, efectivoEnCaja);      

    console.clear();
    console.log(`Su compra: ${valorCompra}`);
    console.log(`Paga con ${valorPago}`);
    console.log(`Su cambio: ${cambioDebido}`);    
    console.log(`Total efectivo en caja: ${totalEfectivoEnCaja}`);    
    console.log(resultadoRevisarCajaRegistradora);

    ejemploEfectivoEnCaja = resultadoRevisarCajaRegistradora.estadoCaja;    
    
    mostrarEfectivoEnCaja('efectivo-caja', ejemploEfectivoEnCaja, "estado-caja", resultadoRevisarCajaRegistradora.estado);           
    //mostrarEfectivoEnCaja('vuelto', resultadoRevisarCajaRegistradora.cambio); 

    resultadoRevisarCajaRegistradora.cambio.forEach((divisa) => {       
        let nombreCambioActual = divisa[0];     

        //flashDivisa(`divisa-${nombreCambioActual}`);
        flashDivisa(`cantidad-${nombreCambioActual}`);
    });    
}
const saludar = () => {
    console.log("hola");
}

function mostrarEfectivoEnCaja(divisasId, efectivoEnCaja, estadoCajaId, estadoCaja){    
    
    const $divisasId = document.getElementById(divisasId);    
    $divisasId.innerHTML = "";
    const $estadoCajaId = document.getElementById(estadoCajaId);
    $estadoCajaId.innerHTML = "";
    
    const agregarDivisa = (divisa) => {
        let nombreDivisaActual = divisa[0];
        let cantidadDivisaActual = divisa[1];

        const $divDivisa = document.createElement("div");
        $divDivisa.classList.add("divisa");
        const $labelNombreDivisa = document.createElement("label");        
        const $labelCantidadDivisa = document.createElement("label"); 
        
        $labelNombreDivisa.setAttribute("id", `divisa-${nombreDivisaActual}`);
        $labelNombreDivisa.classList.add("divisa-nombre-cantidad");
        $labelNombreDivisa.innerHTML = `${nombreDivisaActual}`;

        $labelCantidadDivisa.setAttribute("id", `cantidad-${nombreDivisaActual}`);
        $labelCantidadDivisa.classList.add("divisa-nombre-cantidad");
        $labelCantidadDivisa.innerHTML = `${cantidadDivisaActual}`;

        $divDivisa.appendChild($labelNombreDivisa);
        $divDivisa.appendChild($labelCantidadDivisa);
          
        $divisasId.appendChild($divDivisa);
        
    }
    efectivoEnCaja.map(divisa => agregarDivisa(divisa));
    
    //Muestra el Total efectivo en caja
    let efectivoTotalEnCaja = calcularTotalEfectivoEnCaja(efectivoEnCaja);
    const $labelEfectivoTotal = document.createElement("label");
    $labelEfectivoTotal.classList.add("divisa");
    $labelEfectivoTotal.innerHTML = `Efectivo total:    $ ${efectivoTotalEnCaja}`;
    $divisasId.appendChild($labelEfectivoTotal);

    $estadoCajaId.innerHTML = `Estado de la caja: ${estadoCaja}`;
 
}
mostrarEfectivoEnCaja('efectivo-caja', ejemploEfectivoEnCaja, "estado-caja", "OPEN");


function flashDivisa(divisaId){
    const $divisaLabel = document.getElementById(divisaId);
    $divisaLabel.classList.add("divisa-flasheada");
    setInterval(() => {$divisaLabel.classList.remove("divisa-flasheada")}, 500);
}

