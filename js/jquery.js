'use-strict'

$(function () {
    var inicio = document.querySelector(".empezar");
    var seccion = document.querySelector(".tablero");
    var dificultad = "normal";
    var puntuacion = document.querySelector(".score");
    var relog = document.querySelector(".relog");

    var setIntervalId;
    var snakeX = 5;
    var snakeY = 2;
    var snakeBody = []
    var comidaX, comidaY
    var velocidadX = 0;
    var velocidadY = 0;
    var gameOver = false;
    let score = 0;

    inicio.addEventListener('click', function () {
        limpiarTablero();
        guardarDificultad();
        crearComida();
        iniciarJuego();
        temporizador();
        console.log(dificultad)

        if (dificultad == "dificil") {
            setIntervalId = setInterval(iniciarJuego, 90);
        }
        if (dificultad == "maestro") {
            setIntervalId = setInterval(iniciarJuego, 60);
        }
        else {
            setIntervalId = setInterval(iniciarJuego, 120);
        }
    });


    function guardarDificultad() {
        dificultad = document.querySelector(".dificultad").value;
    }

    function crearComida() {
        comidaX = Math.floor(Math.random() * 30) + 1;
        comidaY = Math.floor(Math.random() * 30) + 1;
        console.log("click")
    }

    function gameOverFun() {
        console.log(setIntervalId);
        clearInterval(setIntervalId);
        window.location.href = 'resultado.html';

    }

    function iniciarJuego() {

        if (gameOver) return gameOverFun();

        if (snakeX == comidaX && snakeY == comidaY) {
            crearComida();
            snakeBody.push([comidaX, comidaY]);
            score++;
            puntuacion.innerHTML = `Score: ${score}`;
            localStorage.setItem("puntuacion", score);
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }

        snakeBody[0] = [snakeX, snakeY];
        snakeX += velocidadX;
        snakeY += velocidadY;

        seccion.innerHTML = '';

        if (snakeX <= 0 || snakeX > 32 || snakeY <= 0 || snakeY > 32) {
            gameOver = true;
        }

        for (let i = 0; i < snakeBody.length; i++) {
            var serpiente = document.createElement("div")
            serpiente.className = ("snake")
            serpiente.style = (`grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}`)
            seccion.appendChild(serpiente);

            if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
                gameOver = true;
            }
        }

        var comida = document.createElement("div")
        comida.className = ("comida")
        comida.style = (`grid-area: ${comidaX} / ${comidaY}`)
        seccion.appendChild(comida);

    }

    // Escucha eventos de teclado para cambiar la dirección de la serpiente
    document.addEventListener('keydown', function (event) {
        cambiarDireccion(event);
    });


    // Función para cambiar la dirección de la serpiente
    function cambiarDireccion(event) {
        if (event.key === 'ArrowUp' && velocidadX != 1) {
            console.log(event.key)
            velocidadX = -1;
            velocidadY = 0;
        } else if (event.key === 'ArrowDown' && velocidadX != -1) {
            console.log(event.key)
            velocidadX = 1;
            velocidadY = 0;
        } else if (event.key === 'ArrowLeft' && velocidadY != 1) {
            velocidadX = 0;
            velocidadY = -1;
        } else if (event.key === 'ArrowRight' && velocidadY != -1) {
            velocidadX = 0;
            velocidadY = 1;
        }

    }
    //});

    function limpiarTablero() {
        // Seleccionar la sección del tablero
        var tablero = document.querySelector('.tablero');

        // Limpiar el contenido del tablero
        tablero.innerHTML = '';

        // Aplicar el atributo CSS display: grid
        tablero.style.display = 'grid';

    }

    function temporizador() {
        let tiempoRestante = 100;

        const intervalo = setInterval(function () {
            tiempoRestante--;
            relog.textContent = tiempoRestante;
            localStorage.setItem("tiempo", (100 - tiempoRestante));

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);//Detiene la cuenta atras
                alert("Se ha acabado el tiempo. REdiriguiendo al inicio de sesion");
                window.location.href = "index.html";
            }
        }, 1000); // Intervalo de 1 segundo

    }


});