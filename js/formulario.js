'use-strict'

$(function () {

    var boton = document.querySelector("#login");


    $.getJSON('../data/usuarios.json', function (data) {
        // Almacenar datos en el LocalStorage
        localStorage.setItem('usuarios', JSON.stringify(data));
    });


    boton.addEventListener('click', function () {
        var usuario = document.getElementById("usuario").value;
        var contraseña = document.getElementById("contraseña").value;

        var usuarioOK = comprobarUsuario(usuario, contraseña)

        var contraseñaOk = validarPassword(contraseña);

        if (!contraseñaOk) {
            alert("La contraseña debe tener entre 8 y 16 caracteres: mayusculas, minusculas y numeros")
            return false;
        }


        if (usuarioOK) {
            console.log("funciona")
            window.open("bienvenida.html");

        } else {

            alert('Usuario o contraseña incorrectos');

        }
    })

    // Función para comprobar si el usuario y la contraseña están en la lista
    function comprobarUsuario(usuario, contraseña) {
        // Obtener datos del LocalStorage
        var usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));

        // Verificar si el usuario y la contraseña coinciden con los almacenados
        for (var i = 0; i < usuariosGuardados.length; i++) {
            var usuarioGuardado = usuariosGuardados[i];


            if (usuario == usuarioGuardado.usuario && contraseña == usuarioGuardado.contraseña) {
                return true; // Usuario autenticado con éxito
            }
        }

        return false; // Usuario no autenticado
    }

    function validarPassword(contraseña) {

        var formato = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{8,16}$");

        if (formato.test(contraseña) === false) {

            return false;
        }
        else {
            return true;
        }
    }
})