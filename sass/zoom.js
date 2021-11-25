
/*---------------------------------------Z O O M-----------------------------------------*/

//Selectores zoom:
const acercarBtn = document.getElementById('btn-zoom-mas')
const alejarBtn = document.getElementById('btn-zoom-menos')

let zoom = 100
let zoomContainer = document.getElementById('scroll-container')

//Funciones para hacer zoom o alejar:
acercarBtn.addEventListener('click', (e) => {
	zoomContainer.style.zoom = (zoom += 25) + '%'
})

alejarBtn.addEventListener('click', (e) => {
	if (zoom > 25) {
		zoomContainer.style.zoom = (zoom -= 25) + '%'
	}
})

//Detecta ancho de pantalla y le asigna valor zoom

/*function asignarZoom() {
	let screenwidth = window.screen.width
	if (screenwidth == 768) {
		document.body.style.zoom = '50%'
	} else if (screenwidth == 1366) {
		document.body.style.zoom = '54%'
	} else if (screenwidth == 1440) {
		document.body.style.zoom = '57%'
	} else if (screenwidth == 1680) {
		document.body.style.zoom = '58%'
	} else if (screenwidth == 1920) {
		document.body.style.zoom = '75%'
	} else {
	}
}*/

/*--------------------------------------- F I N  Z O O M-----------------------------------------*/
