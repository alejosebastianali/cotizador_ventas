function calcularResultado(impresiones, cpm) {
	let imp = validarFormulario(impresiones)
	let cpm1 = validarFormulario(cpm)
	if (imp == false || cpm1 == false) return
	resultado = numFormat.format((imp * cpm1) / 1000)
	return resultado
}

function calcularPorcentaje(resultado1, resultadoTF) {
	let res1 = validarFormulario(resultado1)
	let res2 = validarFormulario(resultadoTF)
	let porcentaje = (res1 * 100) / res2 - 100
	return porcentaje
}

function calcularCPMDesc(porcentajeDesc, cpmTarifario) {
	let porcentaje = validarFormularioDesc(porcentajeDesc) * -1
	let cpm = validarFormulario(cpmTarifario, true)
	let cpmDescuento = cpm - (porcentaje * cpm) / 100
	return cpmDescuento
}

function calcularResultadoDesc(impresiones, cpm) {
	let imp = validarFormulario(impresiones)
	let cpm1 = validarFormularioDesc(cpm)
	if (imp == false || cpm1 == false) return
	resultado = numFormat.format((imp * cpm1) / 1000)
	return resultado
}

function calcularImpresiones(resultado, cpm) {
	let res = validarFormulario(resultado)
	let cpm1 = validarFormulario(cpm)
	if (cpm1 == false || res == false) return
	return numFormat.format((res * 1000) / cpm1)
}
