const numFormat = new Intl.NumberFormat('es-AR')

let resultadoLibreVdValor
let resultadoPisoVdValor
let resultadoTFVdValor
let porcentajeVdValor
let resultadoDescValor
let cpmDescValor
let impPresupuestoValor

let errorVd = false
let fueCheckedViewability = false
let fueCheckedBlast = false
/*------------------------------VENTA DIRECTA------------------------------*/

function validarFormulario(val, negative = false) {
	if (val == '') {
		errorVd = true
		return false
	}
	errorVd = false
	let value = String(val)
	let valSinPunto = value.split('.').join('')
	let valSplit = valSinPunto.trim().split('$')
	let numeroSinSigno = valSplit[0] === '' ? valSplit[1] : valSplit[0]
	numeroSinSigno = parseFloat(numeroSinSigno.split(',').join('.'))
	if (numeroSinSigno > 0 || negative) return numeroSinSigno
	errorVd = true
	return false
}

function validarFormularioDesc(val) {
	if (val == '') {
		errorVd = true
		return false
	}
	errorVd = false
	let value = String(val)
	let valSinPunto = value.split('.').join('')
	let valSplit = valSinPunto.trim().split('%')
	let numeroSinPorcentaje = valSplit[0] === '' ? valSplit[1] : valSplit[0]
	numeroSinPorcentaje = Number(numeroSinPorcentaje)
	return numeroSinPorcentaje
}

function mostrarSeleccionado() {
	let valor = document.getElementById('cpm-presupuesto-vd').value
	return valor
}

impresionesTotalesInput.addEventListener('change', (e) => {
	const val = validarFormulario(e.target.value)
	if (val === false) {
		impresionesTotalesVDSpan.innerHTML = 'Ingrese un número mayor a cero'
		impresionesTotalesVDSpan.classList.remove('hide')
		impresionesTotalesInput.classList.add('invalid')
	} else {
		impresionesTotalesInput.value = numFormat.format(parseFloat(val))
		impresionesTotalesVDSpan.classList.add('hide')
		impresionesTotalesInput.classList.remove('invalid')
	}
})

impresionesVendiblesInput.addEventListener('change', (e) => {
	const val = validarFormulario(e.target.value)
	if (val === false) {
		impresionesVendVDSpan.innerHTML = 'Ingrese un número mayor a cero'
		impresionesVendVDSpan.classList.remove('hide')
		impresionesVendiblesInput.classList.add('invalid')
	} else {
		impresionesVendiblesInput.value = numFormat.format(parseFloat(val))
		impresionesVendVDSpan.classList.add('hide')
		impresionesVendiblesInput.classList.remove('invalid')
		resultadoLibreVdValor = calcularResultado(val, cpmLibreInput.value)
		resultadoTFVdValor = calcularResultado(val, cpmTarifarioInput.value)
		resultadoPisoVdValor = calcularResultado(val, cpmPisoInput.value)
		porcentajeVdValor = calcularPorcentaje(
			resultadoLibreVdValor,
			resultadoTFVdValor
		)
	}
})

cpmLibreInput.addEventListener('change', (e) => {
	let val = validarFormulario(e.target.value)
	let cpmPiso = validarFormulario(cpmPisoInput.value)
	if (val < cpmPiso && val !== false) {
		cpmLibreVDSpanWarning.innerHTML = 'El valor es menor a CPM Piso'
		cpmLibreVDSpanWarning.classList.remove('hide')
		cpmLibreInput.classList.add('warning')
		cpmLibreVDSpanWarning.classList.add('warning-span')
	} else {
		cpmLibreVDSpanWarning.classList.add('hide')
		cpmLibreInput.classList.remove('warning')
		cpmLibreVDSpanWarning.classList.remove('warning-span')
	}

	if (val === false) {
		cpmLibreInput.classList.add('invalid')
		cpmLibreVDSpan.innerHTML = 'Ingrese un número mayor a cero'
		cpmLibreVDSpan.classList.remove('hide')
	} else {
		cpmLibreInput.value = '$' + numFormat.format(parseFloat(val))
		cpmLibreInput.classList.remove('invalid')
		cpmLibreVDSpan.classList.add('hide')
		resultadoLibreVdValor = calcularResultado(
			impresionesVendiblesInput.value,
			val
		)
		resultadoTFVdValor = calcularResultado(
			impresionesVendiblesInput.value,
			cpmTarifarioInput.value
		)
		porcentajeVdValor = calcularPorcentaje(
			resultadoLibreVdValor,
			resultadoTFVdValor
		)

		let option = document.createElement('option')
		option.text = '$' + val
		option.value = val
		let select = document.getElementById('cpm-presupuesto-vd')
		select.appendChild(option)
	}
})

viewabilityInput.addEventListener('change', (e) => {
	if (viewabilityInput.checked == true) {
		resultadoTFVdValor =
			Number(String(resultadoTFVdValor).split('.').join('')) + 20
		resultadoTFVdValor = numFormat.format(
			parseFloat(String(resultadoTFVdValor).split(',').join('.'))
		)
		if (resultadoLibreVdValor !== undefined) {
			resultadoLibreVdValor =
				Number(String(resultadoLibreVdValor).split('.').join('')) + 20
			resultadoLibreVdValor = numFormat.format(
				parseFloat(String(resultadoLibreVdValor).split(',').join('.'))
			)
		}
		resultadoPisoVdValor =
			Number(String(resultadoPisoVdValor).split('.').join('')) + 20
		resultadoPisoVdValor = numFormat.format(
			parseFloat(String(resultadoPisoVdValor).split(',').join('.'))
		)

		fueCheckedViewability = true
	} else {
		if (fueCheckedViewability == true) {
			resultadoTFVdValor =
				Number(String(resultadoTFVdValor).split('.').join('')) - 20
			resultadoTFVdValor = numFormat.format(
				parseFloat(String(resultadoTFVdValor).split(',').join('.'))
			)
			if (resultadoLibreVdValor !== undefined) {
				resultadoLibreVdValor =
					Number(String(resultadoLibreVdValor).split('.').join('')) - 20
				resultadoLibreVdValor = numFormat.format(
					parseFloat(String(resultadoLibreVdValor).split(',').join('.'))
				)
			}
			resultadoPisoVdValor =
				Number(String(resultadoPisoVdValor).split('.').join('')) - 20
			resultadoPisoVdValor = numFormat.format(
				parseFloat(String(resultadoPisoVdValor).split(',').join('.'))
			)
		}
	}
})

blastInput.addEventListener('change', (e) => {
	if (blastInput.checked == true) {
		resultadoTFVdValor =
			Number(String(resultadoTFVdValor).split('.').join('')) + 30
		resultadoTFVdValor = numFormat.format(
			parseFloat(String(resultadoTFVdValor).split(',').join('.'))
		)
		if (resultadoLibreVdValor !== undefined) {
			resultadoLibreVdValor =
				Number(String(resultadoLibreVdValor).split('.').join('')) + 30
			resultadoLibreVdValor = numFormat.format(
				parseFloat(String(resultadoLibreVdValor).split(',').join('.'))
			)
		}
		resultadoPisoVdValor =
			Number(String(resultadoPisoVdValor).split('.').join('')) + 30
		resultadoPisoVdValor = numFormat.format(
			parseFloat(String(resultadoPisoVdValor).split(',').join('.'))
		)
		if (resultadoDescValor !== undefined) {
			resultadoDescValor =
				Number(String(resultadoDescValor).split('.').join('')) + 30
			resultadoDescValor = numFormat.format(
				parseFloat(String(resultadoDescValor).split(',').join('.'))
			)
		}
		fueCheckedBlast = true
	} else {
		if (fueCheckedBlast == true) {
			resultadoTFVdValor =
				Number(String(resultadoTFVdValor).split('.').join('')) - 30
			resultadoTFVdValor = numFormat.format(
				parseFloat(String(resultadoTFVdValor).split(',').join('.'))
			)
			if (resultadoLibreVdValor !== undefined) {
				resultadoLibreVdValor =
					Number(String(resultadoLibreVdValor).split('.').join('')) - 30
				resultadoLibreVdValor = numFormat.format(
					parseFloat(String(resultadoLibreVdValor).split(',').join('.'))
				)
			}
			resultadoPisoVdValor =
				Number(String(resultadoPisoVdValor).split('.').join('')) - 30
			resultadoPisoVdValor = numFormat.format(
				parseFloat(String(resultadoPisoVdValor).split(',').join('.'))
			)
			if (resultadoDescValor !== undefined) {
				resultadoDescValor =
					Number(String(resultadoDescValor).split('.').join('')) - 30
				resultadoDescValor = numFormat.format(
					parseFloat(String(resultadoDescValor).split(',').join('.'))
				)
			}
		}
	}
})

function porcentajeDescuento() {
	let val = validarFormularioDesc(porcentajeDescInput.value)
	let cpmTF = validarFormulario(cpmTarifarioInput.value)
	if (val === false) {
	} else {
		cpmDescValor = calcularCPMDesc(val, cpmTF)
		resultadoDescValor = calcularResultadoDesc(
			impresionesVendiblesInput.value,
			cpmDescValor
		)
		if (viewabilityInput.checked == true) {
			if (resultadoDescValor !== undefined) {
				resultadoDescValor =
					Number(String(resultadoDescValor).split('.').join('')) + 20
				resultadoDescValor = numFormat.format(
					parseFloat(String(resultadoDescValor).split(',').join('.'))
				)
			} else {
				if (fueCheckedViewability == true) {
					if (resultadoDescValor !== undefined) {
						resultadoDescValor =
							Number(String(resultadoDescValor).split('.').join('')) - 20
						resultadoDescValor = numFormat.format(
							parseFloat(String(resultadoDescValor).split(',').join('.'))
						)
					}
				}
			}
		}

		if (blastInput.checked == true) {
			if (resultadoDescValor !== undefined) {
				resultadoDescValor =
					Number(String(resultadoDescValor).split('.').join('')) + 30
				resultadoDescValor = numFormat.format(
					parseFloat(String(resultadoDescValor).split(',').join('.'))
				)
			} else {
				if (fueCheckedBlast == true) {
					if (resultadoDescValor !== undefined) {
						resultadoDescValor =
							Number(String(resultadoDescValor).split('.').join('')) - 30
						resultadoDescValor = numFormat.format(
							parseFloat(String(resultadoDescValor).split(',').join('.'))
						)
					}
				}
			}
		}
		porcentajeDescInput.value = val + '%'
	}
}

presupuestoInput.addEventListener('change', (e) => {
	let val = validarFormulario(e.target.value)
	let cpmPresupuesto = mostrarSeleccionado()
	if (val === false) {
		presupuestoVDSpan.innerHTML = 'Ingrese un número mayor a cero'
		presupuestoVDSpan.classList.remove('hide')
		presupuestoInput.classList.add('invalid')
	} else {
		presupuestoInput.value = numFormat.format(parseFloat(val))
		presupuestoVDSpan.classList.add('hide')
		presupuestoInput.classList.remove('invalid')
		impPresupuestoValor = calcularImpresiones(val, cpmPresupuesto)
	}
})

cpmPresupuestoInput.addEventListener('change', (e) => {
	let val = validarFormulario(e.target.value)
	let presupuesto = validarFormulario(presupuestoInput.value)
	if (val === false) {
		presupuestoVDSpan.innerHTML = 'Ingrese un número mayor a cero'
		presupuestoVDSpan.classList.remove('hide')
		presupuestoInput.classList.add('invalid')
	} else {
		presupuestoInput.value = numFormat.format(parseFloat(presupuesto))
		presupuestoVDSpan.classList.add('hide')
		presupuestoInput.classList.remove('invalid')
		impPresupuestoValor = calcularImpresiones(presupuesto, val)
	}
})

botonCalcular.addEventListener('click', (e) => {
	if (errorVd == true) {
		resultadoTFInput.value = ''
		resultadoInput.value = ''
		resultadoPisoInput.value = ''
		porcentajeInput.value = ''
		return false
	}

	resultadoTFInput.value =
		resultadoTFVdValor !== undefined ? '$' + resultadoTFVdValor : ''
	resultadoInput.value =
		resultadoLibreVdValor !== undefined ? '$' + resultadoLibreVdValor : ''
	resultadoPisoInput.value =
		resultadoPisoVdValor !== undefined ? '$' + resultadoPisoVdValor : ''

	if (porcentajeVdValor > 0) {
		porcentajeInput.value = '+' + porcentajeVdValor + '%'
	} else if (porcentajeVdValor == 0) {
		porcentajeInput.value = porcentajeVdValor + '%'
	} else if (porcentajeVdValor < 0) {
		porcentajeInput.value = porcentajeVdValor + '%'
	}

	if (resultadoLibreVdValor == undefined || porcentajeVdValor == undefined) {
		porcentajeInput.value = ''
	}
})

botonCalcular2.addEventListener('click', (e) => {
	porcentajeDescuento()

	if (errorVd == true) {
		resultadoDescInput.value = ''
		cpmDescInput.value = ''
		return false
	}

	resultadoDescInput.value =
		resultadoDescValor !== undefined ? '$' + resultadoDescValor : ''
	cpmDescInput.value = cpmDescValor !== undefined ? '$' + cpmDescValor : ''
})

botonCalcular3.addEventListener('click', (e) => {
	if (errorVd == true) {
		impPresupuestoInput.value = ''
		return false
	}

	impPresupuestoInput.value =
		impPresupuestoValor !== undefined ? impPresupuestoValor : ''
})

/*--------------------------------------------------------------------------------------------------*/

botonReset.addEventListener('click', (e) => {
	impresionesVendiblesInput.value = ''
	cpmLibreInput.value = ''
	resultadoTFInput.value = ''
	resultadoPisoInput.value = ''
	resultadoInput.value = ''
	porcentajeInput.value = ''

	cpmLibreVDSpan.classList.add('hide')
	cpmLibreVDSpanWarning.classList.add('hide')
	impresionesVendVDSpan.classList.add('hide')

	impresionesVendiblesInput.classList.remove('invalid')
	cpmLibreInput.classList.remove('warning')
	cpmLibreVDSpanWarning.classList.remove('warning-span')
	cpmLibreInput.classList.remove('invalid')

	resultadoLibreVdValor = undefined
	resultadoPisoVdValor = undefined
	resultadoTFVdValor = undefined

	blastInput.checked = false
	viewabilityInput.checked = false
})

botonReset2.addEventListener('click', (e) => {
	impresionesVendiblesInput.value = ''
	porcentajeDescInput.value = ''
	resultadoDescInput.value = ''
	cpmDescInput.value = ''

	impresionesVendVDSpan.classList.add('hide')

	impresionesVendiblesInput.classList.remove('invalid')

	porcentajeVdValor = undefined
	resultadoDescValor = undefined
	cpmDescValor = undefined

	blastInput.checked = false
	viewabilityInput.checked = false
})

botonReset3.addEventListener('click', (e) => {
	impresionesVendiblesInput.value = ''
	presupuestoInput.value = ''
	cpmPresupuestoInput.value = ''
	impPresupuestoInput.value = ''

	presupuestoVDSpan.classList.add('hide')
	cpmPresupuestoVDSpan.classList.add('hide')
	impresionesVendVDSpan.classList.add('hide')

	impresionesVendiblesInput.classList.remove('invalid')
	presupuestoInput.classList.remove('invalid')

	impPresupuestoValor = undefined

	blastInput.checked = false
	viewabilityInput.checked = false
})
