
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
let ejemploEfectivoEnCaja = [
    ["PENNY", 0.02],
    ["NICKEL", 0.10],
    ["DIME", 0.2],
    ["QUARTER", 0.50],
    ["ONE", 2],
    ["FIVE", 10],
    ["TEN", 20],
    ["TWENTY", 40],
    ["ONE HUNDRED", 200]
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
/*
function ponerComas(efectivoArray){
    const temp = [...efectivoArray];
    temp.forEach(divisa => divisa[1] = Math)
}
*/
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
    let cambio = (pago - precio)
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
function sacarCambio(cambio, divisas, efectivo){      
    const longitudDivisas = divisas.length - 1;    
    const cambioAdar = [];   

    const buscarLaDivisa = (nombreDivisa, efectivo) => {      
        //console.log(nombreDivisa);
        //console.log(efectivo);
        let encontrada = false;
        let indiceEncontrada = 0;
        efectivo.forEach((efectivo, indice) => {
            if (efectivo[0] === nombreDivisa){
                encontrada = true;
                indiceEncontrada = indice;
            }
        });
        //console.log(encontrada, indiceEncontrada);
        return [encontrada, indiceEncontrada];
    }
    for (i = longitudDivisas; i >= 0; i--){        
        while (efectivo[i][1] > 0 && cambio > 0 && cambio >= divisas[i][1]){
            efectivo[i][1] -= divisas[i][1];
            cambio -= divisas[i][1]; 

            let resultadoBusqueda = buscarLaDivisa(divisas[i][0], cambioAdar);
            let indiceResultadoBusqueda = resultadoBusqueda[1];
            let estaLaDivisa = resultadoBusqueda[0]; 

            if (!estaLaDivisa) cambioAdar.push([divisas[i][0], divisas[i][1]]);             
            else cambioAdar[indiceResultadoBusqueda][1] += divisas[i][1]; 
        }
    }
    return (cambio == 0.00)?[cambioAdar, true]:[cambioAdar, false]; 
}
//console.log(sacarCambio(3, divisasSinComas, ejemploEfectivoEnCajaSinComas));

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
, [["TEN", 1000], ["FIVE", 500], ["ONE", 200], ["QUARTER", 275], ["DIME", 20]]));
*/

/***************************** HASTA ACA REVISADO **********************************************************/

//Funcion principal, recibe los valores con decimales, dentro se los quita con la funcion sacarComas();
function revisarCajaRegistradora(precioCompraPasado, pagoEfectuadoPasado, efectivoEnCaja){    
    
    let precioCompra = Math.trunc(parseFloat(precioCompraPasado*100));
    let pagoEfectuado = Math.trunc(parseFloat(pagoEfectuadoPasado*100));
    efectivoEnCaja = sacarComas(efectivoEnCaja);     
    
    if (precioCompra > pagoEfectuado) return {estado: "PAGO_INSUFICIENTE", change: []};

    let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(efectivoEnCaja);
    let cambioDebido = calcularCambioDebido(pagoEfectuado,  precioCompra);

    console.log(`compra: ${precioCompra},su pago: ${pagoEfectuado}`);
    console.log(`Cambio debido: ${cambioDebido}`);     
    console.log(efectivoEnCaja);
    console.log(`total efectivo: ${totalEfectivoEnCaja}`);   

    let resultadoSacarCambio = sacarCambio(cambioDebido, divisasSinComas, efectivoEnCaja);
    let tengoCambioExacto = resultadoSacarCambio[1];
    let cambioExacto = resultadoSacarCambio[0];
    let efectivoEnCajaActualizado = [];

    if (tengoCambioExacto) {
        console.log(cambioExacto);    
        //efectivoEnCajaActualizado = actualizarEfectivoEnCaja(efectivoEnCaja, cambioExacto);
    }
    else console.log("no tengo cambio");

    /*determino el estado a retornar*/
    if (totalEfectivoEnCaja < cambioDebido) return {estado: "SALDOS_INSUFICIENTES", cambio: [], estadoCaja: efectivoEnCaja};
    if (totalEfectivoEnCaja === cambioDebido) return {estado: "CAJA_CERRADA", cambio: cambioExacto, estadoCaja: efectivoEnCaja};
    if (!tengoCambioExacto) return {estado: "SALDOS_INSUFICIENTES_CAMBIO", cambio: [], estadoCaja: efectivoEnCaja};
    
    //esta ultima actualizacion del estado de la caja registradora no lo piden en el ejercicio.    
    //let efectivoEnCajaActualizado = actualizarEfectivoEnCaja(efectivoEnCaja, tengoCambioExacto[0]);
    return {
        estado: 'OPEN',
        cambio: cambioExacto,
        estadoCaja: efectivoEnCaja
    }
    /**/
}
//poner con comas
console.log(revisarCajaRegistradora(0.1, 0.4, ejemploEfectivoEnCaja));

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

    let valorCompra = parseFloat($compraValorId.value);
    let valorPago = parseFloat($pagoValorId.value);
    const resultadoRevisarCajaRegistradora = revisarCajaRegistradora(valorCompra, valorPago, ejemploEfectivoEnCaja);      

    console.log(valorCompra, typeof(valorCompra));
    console.log(valorPago, typeof(valorPago));
    console.log(resultadoRevisarCajaRegistradora);

    //console.log(`Total efectivo en caja: ${acumulador}`);
    
    mostrarEfectivoEnCaja('divisas', ejemploEfectivoEnCaja);       
}

function mostrarEfectivoEnCaja(divisasId, efectivoEnCaja){
    
    const $divisasId = document.getElementById(divisasId);    
    $divisasId.innerHTML = "";
    const agregarDivisa = (divisa) => {
        const $labelDivisa = document.createElement("label");        
        $labelDivisa.classList.add('divisa');
        $labelDivisa.setAttribute("id", `${divisa[0]}`);
        $labelDivisa.innerHTML = `${divisa[0]} = ${divisa[1]}`;
        $divisasId.appendChild($labelDivisa);   
    }
    efectivoEnCaja.map(divisa => agregarDivisa(divisa));

    //$divisasId.innerHTML += calcularTotalEfectivoEnCaja(efectivoEnCaja);
 
}

//mostrarEfectivoEnCaja('divisas', ejemploEfectivoEnCaja);