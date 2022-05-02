
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

// let tengoCambioExacto = sacarCambio(cambioDebido, divisas, ejemploEfectivoEnCaja);  
/*Se le pasa el cambio que hay que dar, "divisas" que es un array con el nombre y el valor de la unidad de las divisas 
    y el efectivo que hay en la caja actualmente.
    la funcion arma el vuelto (cambio debido) a dar, en base a lo que hay en la caja, 
*/
function sacarCambio(cambio, divisa, efectivo){   
    //divisasEfectivoOrdenado = [0. valorDivisa, 1. nombreDivisa, 2. cantidadDivisa]
    const longitudDivisa = divisa.length; 
    const divisasEfectivoOrdenado = [];
    const cambioAdar = [];   

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
                cambioAdar.push([element[1], element[0]]);       
        }
    });    
    //console.log(cambioAdar);    
    return (cambio == 0.00)?cambioAdar:false;    
}

//actualiza la cantidad de efectivo en la caja, despues de haber podido dar un vuelto.
function actualizarEfectivoEnCaja(efectivoEnCajaAnterior, actualizacionCaja){    
    for (let i = 0; i < efectivoEnCajaAnterior.length; i++){
        for (let j = 0; j < actualizacionCaja.length; j++){
            if (efectivoEnCajaAnterior[i][0] == actualizacionCaja[j][0]) {
                //console.log('encontrado: ', + efectivoEnCajaAnterior[i][1]);
                efectivoEnCajaAnterior[i][1] -= actualizacionCaja[j][1];
                efectivoEnCajaAnterior[i][1] = Number.parseFloat(efectivoEnCajaAnterior[i][1]).toFixed(2);
            }
        }
    }   
    return efectivoEnCajaAnterior;
}

function sacarDivisasRepetidas(cambioAdar, divisas){   
    const cambioAdarAretornar = [];      
    divisas.forEach((divisas) => {
        
        const cambioAdarTemporal = cambioAdar.filter(cambio => cambio[0] === divisas[0]);                
        let sumatoriaDivisas = 0;
        
        if (cambioAdarTemporal.length !== 0){
            cambioAdarTemporal.forEach((cambio) => sumatoriaDivisas += cambio[1]);    
            sumatoriaDivisas = parseFloat(sumatoriaDivisas).toFixed(2);
            cambioAdarAretornar.push([divisas[0], sumatoriaDivisas]);
        }
    });
    return cambioAdarAretornar;    
}
//console.log(sacarDivisasRepetidas([['QUARTER', 0.25], ['NICKEL', 0.05], ['NICKEL', 0.05], ['NICKEL', 0.05]], divisas));


//Funcion principal
function revisarCajaRegistradora(precioCompra, pagoEfectuado, efectivoEnCaja){    

    if (precioCompra > pagoEfectuado) return {estado: "PAGO_INSUFICIENTE", change: []};

    let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(ejemploEfectivoEnCaja);
    let cambioDebido = calcularCambioDebido(pagoEfectuado,  precioCompra);    
    let tengoCambioExacto = sacarCambio(cambioDebido, divisas, efectivoEnCaja);    
    
    //console.clear();
    console.log(`Total efectivo en caja: ${totalEfectivoEnCaja}`);
    console.log(`Cambio debido: ${cambioDebido}`);        

    /*determino el estado a retornar*/    
    if (totalEfectivoEnCaja < cambioDebido) return {estado: "SALDOS_INSUFICIENTES", cambio: []};
    if (totalEfectivoEnCaja === cambioDebido) return {estado: "CAJA_CERRADA", cambio: sacarDivisasRepetidas(tengoCambioExacto, divisas)};
    if (tengoCambioExacto === false) return {estado: "SALDOS_INSUFICIENTES", cambio: []};
    //esta ultima actualizacion del estado de la caja registradora no lo piden en el ejercicio.
    else ejemploEfectivoEnCaja = actualizarEfectivoEnCaja(ejemploEfectivoEnCaja, tengoCambioExacto);
    
    return {
        estado: 'OPEN',
        cambio: sacarDivisasRepetidas(tengoCambioExacto, divisas)
    }
}
/* TODAS LAS PRUEBAS DE FREECODECAMP PASADAS !! */
//console.log(revisarCajaRegistradora(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]] ));
//console.log(revisarCajaRegistradora( 3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(revisarCajaRegistradora( 19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] ));
//console.log(ejemploEfectivoEnCaja);

function darVuelto(compraValorId, pagoValorId){
    const $compraValorId = document.getElementById(compraValorId);
    const $pagoValorId = document.getElementById(pagoValorId);  

    const valorCompra = $compraValorId.value;
    const valorPago = $pagoValorId.value;

    console.log(valorCompra);
    console.log(valorPago);
    console.log(revisarCajaRegistradora(valorCompra, valorPago, ejemploEfectivoEnCaja));
    
    mostrarEfectivoEnCaja('divisas', ejemploEfectivoEnCaja);       
}

function mostrarEfectivoEnCaja(divisasId, efectivoEnCaja){
    
    //let totalEfectivoEnCaja = calcularTotalEfectivoEnCaja(efectivoEnCaja);
    //console.log(efectivoEnCaja);
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
/*
    const $totalEfectivoLabel = document.createElement("label");
    $totalEfectivoLabel.innerHTML = `Total Efectivo Caja = ${totalEfectivoEnCaja}`;
    $divisasId.appendChild($totalEfectivoLabel);
  */  
}

mostrarEfectivoEnCaja('divisas', ejemploEfectivoEnCaja);