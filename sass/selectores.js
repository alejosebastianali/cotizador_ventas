/*------------------------------VENTA DIRECTA------------------------------*/

//input
let tiempoSelect = document.getElementById('time-vd')
let impresionesTotalesInput = document.getElementById('imp-totales-vd')
let impresionesVendiblesInput = document.getElementById('imp-vend')
let viewabilityInput = document.getElementById('viewability')
let blastInput = document.getElementById('blast')
let cpmTarifarioInput = document.getElementById('cpm-tf-vd')
let cpmPisoInput = document.getElementById('cpm-piso-vd')
let cpmLibreInput = document.getElementById('cpm-libre-vd')
let resultadoInput = document.getElementById('res-vd')
let resultadoTFInput = document.getElementById('res-tf-vd')
let resultadoPisoInput = document.getElementById('res-piso-vd')
let porcentajeInput = document.getElementById('cpm-descuento-vd')

let porcentajeDescInput = document.getElementById('porcentaje-descuento-vd')
let resultadoDescInput = document.getElementById('res-desc-vd')
let cpmDescInput = document.getElementById('cpm-desc-vd')

let presupuestoInput = document.getElementById('presupuesto-vd')
let cpmPresupuestoInput = document.getElementById('cpm-presupuesto-vd')
let impPresupuestoInput = document.getElementById('imp-presupuesto-vd')

const botonCalcular = document.getElementById('boton-calcular')
const botonReset = document.getElementById('boton-reset')
const botonCalcular2 = document.getElementById('boton-calcular2')
const botonReset2 = document.getElementById('boton-reset2')
const botonCalcular3 = document.getElementById('boton-calcular3')
const botonReset3 = document.getElementById('boton-reset3')

//span
const impresionesTotalesVDSpan = document.getElementById(
	'impresiones-totales-span'
)
const impresionesVendVDSpan = document.getElementById('impresiones-vend-span')
const cpmLibreVDSpan = document.getElementById('cpm-libre-span-vd')
const cpmLibreVDSpanWarning = document.getElementById('cpm-libre-span-vd-war')

const presupuestoVDSpan = document.getElementById('presupuesto-span-vd')
const cpmPresupuestoVDSpan = document.getElementById('cpm-presupuesto-span-vd')
