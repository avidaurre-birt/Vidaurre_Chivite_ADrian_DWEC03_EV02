'use-strict'

$(function () {

    var puntuacion = localStorage.getItem("puntuacion");
    var tiempo = localStorage.getItem("tiempo");
    var resultados = document.getElementById('resultados');
    var resumen = document.getElementById('resumen');
    var tiempos = document.getElementById('tiempos');
    var reiniciar = document.getElementById('reiniciar');
    var salir = document.getElementById('salir');




    resultado(puntuacion);



    function resultado() {
        // Selecciona los elementos de resultados

        resumen.textContent = `SCORE: ${puntuacion} puntos`;
        tiempos.textContent = `TIEMPO: ${tiempo} segundos`;

    }

    // Maneja el botón de reinicio
    reiniciar.addEventListener('click', function () {
        window.location.href = 'inicio.html';
    });

    // Maneja el botón de salir
    salir.addEventListener('click', function () {
        window.location.href = 'index.html'; // Redirige a la interfaz de login
    });


});