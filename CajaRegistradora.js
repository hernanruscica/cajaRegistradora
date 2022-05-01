
/*
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

let ejemploEfectivoEnCaja = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 0],
    ["QUARTER", 10],
    ["ONE", 1],
    ["FIVE", 55],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ]

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
  
function calcularTotalEfectivoEnCaja(efectivoEnCaja){
    let acumuladorEfectivo = 0;
    efectivoEnCaja.forEach(element => {
        acumuladorEfectivo += element[1];        
    }); 
    acumuladorEfectivo = Number.parseFloat(acumuladorEfectivo).toFixed(2);
    return acumuladorEfectivo 
}

function calcularCambioDebido(pago, precio){
    if (precio > pago) return -1;
    let cambio = (pago - precio)
    return Number.parseFloat(cambio).toFixed(2);
}

//no la uso por ahora..
function sacarDivisa(indexDivisa, divisas, efectivoEnCaja){
    if (efectivoEnCaja[indexDivisa][1] - divisas[indexDivisa][1] >= 0){
        efectivoEnCaja[indexDivisa][1] = efectivoEnCaja[indexDivisa][1] - divisas[indexDivisa][1];
        return true;
    }
    else
        return false;    
}


function sacarCambio(cambio, divisa, efectivo){   
    //divisasEfectivoOrdenado = [0. valorDivisa, 1. nombreDivisa, 2. cantidadDivisa]
    const longitudDivisa = divisa.length; 
    const divisasEfectivoOrdenado = [];
    const cambioAdar = [];

    const buscarDivisaEnCambioAdar = (nombreDivisa) => {        
        
        cambioAdar.forEach((element, indice) => {
            console.log(element[0], nombreDivisa);
            if (element[0] === nombreDivisa){
                
                return [true, indice];

            }
        });
        return [false, -1];

    }

    for (let i = 0; i < longitudDivisa; i++){
        divisasEfectivoOrdenado.push([divisa[i][1], efectivo[i][0], efectivo[i][1]]);
    }
    divisasEfectivoOrdenado.sort((a, b) => b[0] - a[0]);

    divisasEfectivoOrdenado.forEach((element) => {
        while (element[2] > 0 && cambio > 0 && cambio >= element[0]) {                                
                element[2] -= element[0];
                cambio -= element[0];
                cambio = Number.parseFloat(cambio).toFixed(2);
                element[2] = Number.parseFloat(element[2]).toFixed(2);

                //aca tengo que mirar si ya no hay una divisa de ese de nombre para sumarla o pushear una nueva. 
                cambioAdar.push([element[1], element[0]]);
                 /*
                let estaEnCambioAdar = buscarDivisaEnCambioAdar(element[1]);
                console.log(estaEnCambioAdar[0]);
                
                if (!estaEnCambioAdar[0]) {
                    cambioAdar.push([element[1], element[0]]);
                }else {
                    cambioAdar
                } */             
                
        }
    });        
    //console.log(cambioAdar);
    
    return (cambio == 0.00)?cambioAdar:false;
    
}

//console.log(sacarCambio(351, divisas, ejemploEfectivoEnCaja));

function actualizarEfectivoEnCaja(efectivoEnCajaAnterior, actualizacionCaja){
    //console.log(efectivoEnCajaAnterior);
    //console.log(actualizacionCaja);
    for (let i = 0; i < efectivoEnCajaAnterior.length; i++){
        for (let j = 0; j < actualizacionCaja.length; j++){
            if (efectivoEnCajaAnterior[i][0] == actualizacionCaja[j][0]) {
                //console.log('encontrado: ', + efectivoEnCajaAnterior[i][1]);
                efectivoEnCajaAnterior[i][1] -= actualizacionCaja[j][1];
                efectivoEnCajaAnterior[i][1] = Number.parseFloat(efectivoEnCajaAnterior[i][1]).toFixed(2);
            }
        }
    }
    //console.log(efectivoEnCajaAnterior);
    return efectivoEnCajaAnterior;
}

function revisarCajaRegistradora(precioCompra, pagoEfectuado, efectivoEnCaja){

    if (precioCompra > pagoEfectuado) return {estado: "PAGO_INSUFICIENTE", change: []};

    let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(ejemploEfectivoEnCaja);
    let cambioDebido = calcularCambioDebido(pagoEfectuado,  precioCompra);    
    let tengoCambioExacto = sacarCambio(cambioDebido, divisas, ejemploEfectivoEnCaja);    

    
    console.log(`Total cambio en efectivo: ${totalEfectivoEnCaja}`);
    console.log(`Cambio debido: ${cambioDebido}`);    
    //console.log('cambio a dar: ' + tengoCambioExacto);      

    /*determino el estado a retornar*/    
    if (totalEfectivoEnCaja < cambioDebido) return {estado: "SALDOS_INSUFICIENTES", change: []};
    if (totalEfectivoEnCaja === cambioDebido) return {estado: "CAJA_CERRADA", change: []};
    if (tengoCambioExacto === false) return {estado: "SALDOS_INSUFICIENTES", change: []};
    else ejemploEfectivoEnCaja = actualizarEfectivoEnCaja(ejemploEfectivoEnCaja, tengoCambioExacto);
    
    return {
        estado: 'OPEN',
        cambio: tengoCambioExacto
    }
}
//console.log(revisarCajaRegistradora(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(revisarCajaRegistradora(19.6, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(ejemploEfectivoEnCaja);


