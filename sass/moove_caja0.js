//Funcion con scroll para la sombra de la barra de navegacion
window.onscroll = function() {CajaCero()};

function CajaCero() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 225) {
    document.getElementById("CajaCero").className = "caja-0-suelta";
  } else {
    document.getElementById("CajaCero").className = "caja-0";
  }
}
