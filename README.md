# cajaRegistradora
<h1>Caja registradora de freecodecamp</h1>
<p>Proyecto final del curso de javascript y estructura de datos de <a href="https://freecodecamp.org">FreeCodeCamp</a>
<p>Enunciado <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register" target = "_BLANK">aca</a></p>
<p>
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
ordenados de mayor a menor, con el valor de "cambio".Diseñar una funcion de caja registradora checkCashRegister() que acepte el precio de compra como 
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
</p>
