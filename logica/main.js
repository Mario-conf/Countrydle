// Variables globales
let paises = [];
let paisObjetivo = null;
let intentosRestantes = 6;

// Llamar a la función inicializarJuego
inicializarJuego((listaPaises, paisSeleccionado) => {
    paises = listaPaises;
    paisObjetivo = paisSeleccionado;
});

// Manejar el evento del botón "Adivinar"
document.getElementById("guess-button").addEventListener("click", () => {
    const inputUsuario = document.getElementById("guess-input").value.trim();

    if (!inputUsuario) {
        const mensaje = "Por favor, escribe un nombre de país.";
        mostrarRetroalimentacion(mensaje, "incorrecto");
        actualizarTablaFeedback(6 - intentosRestantes + 1, mensaje);
        return;
    }

    if (validarRespuesta(inputUsuario, paisObjetivo.nombre)) {
        const mensaje = `¡Correcto! El país era ${paisObjetivo.nombre}.`;
        mostrarRetroalimentacion(mensaje, "correcto");
        actualizarTablaFeedback(6 - intentosRestantes + 1, mensaje);
        guardarProgreso("ultimoResultado", { exito: true, pais: paisObjetivo.nombre });
        reiniciarJuego();
    } else {
        intentosRestantes--;
        if (intentosRestantes > 0) {
            const paisIngresado = paises.find(
                (p) => p.nombre.toLowerCase() === inputUsuario.toLowerCase()
            );

            if (paisIngresado) {
                const distancia = calcularDistancia(
                    paisObjetivo.latitud,
                    paisObjetivo.longitud,
                    paisIngresado.latitud,
                    paisIngresado.longitud
                );
                const direccion = calcularDireccion(paisIngresado.longitud, paisObjetivo.longitud);
                const mensaje = `Incorrecto. Distancia: ${Math.round(distancia)} km. Dirección: ${direccion}. Intentos restantes: ${intentosRestantes}.`;
                mostrarRetroalimentacion(mensaje, "incorrecto");
                actualizarTablaFeedback(6 - intentosRestantes + 1, mensaje);
            } else {
                const mensaje = "El país ingresado no es válido.";
                mostrarRetroalimentacion(mensaje, "incorrecto");
                actualizarTablaFeedback(6 - intentosRestantes + 1, mensaje);
            }
        } else {
            const mensaje = `¡Juego terminado! El país era ${paisObjetivo.nombre}.`;
            mostrarRetroalimentacion(mensaje, "incorrecto");
            actualizarTablaFeedback(6 - intentosRestantes + 1, mensaje);
            guardarProgreso("ultimoResultado", { exito: false, pais: paisObjetivo.nombre });
            reiniciarJuego();
        }
    }

    // Limpiar el campo de entrada
    document.getElementById("guess-input").value = "";
});

// Reiniciar el juego
function reiniciarJuego() {
    intentosRestantes = 6;
    inicializarJuego((listaPaises, paisSeleccionado) => {
        paises = listaPaises;
        paisObjetivo = paisSeleccionado;
    });
    mostrarRetroalimentacion("Nuevo juego iniciado. ¡Buena suerte!", "neutro");
}