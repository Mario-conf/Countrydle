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
        mostrarRetroalimentacion("Por favor, escribe un nombre de país.", "incorrecto");
        return;
    }

    if (validarRespuesta(inputUsuario, paisObjetivo.nombre)) {
        mostrarRetroalimentacion(`¡Correcto! El país era ${paisObjetivo.nombre}.`, "correcto");
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
                mostrarRetroalimentacion(
                    `Incorrecto. Distancia: ${Math.round(distancia)} km. Dirección: ${direccion}. Intentos restantes: ${intentosRestantes}.`,
                    "incorrecto"
                );
            } else {
                mostrarRetroalimentacion("El país ingresado no es válido.", "incorrecto");
            }
        } else {
            mostrarRetroalimentacion(`¡Juego terminado! El país era ${paisObjetivo.nombre}.`, "incorrecto");
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