// Función para seleccionar un país al azar de una lista
function seleccionarPaisAleatorio(listaPaises) {
    const indiceAleatorio = Math.floor(Math.random() * listaPaises.length);
    return listaPaises[indiceAleatorio];
}

// Función para calcular la distancia entre dos coordenadas geográficas (en kilómetros)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

// Función para mostrar una pista textual sobre el país
function renderizarSiluetaPais(nombrePais) {
    const contenedor = document.getElementById("country-contour");
    contenedor.textContent = `Pista: El país comienza con la letra "${nombrePais.charAt(0)}".`;
}

// Función para mostrar retroalimentación al usuario
function mostrarRetroalimentacion(mensaje, tipo) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = mensaje;
    feedback.className = tipo; 
}

// Función para validar la respuesta del usuario
function validarRespuesta(respuestaUsuario, paisObjetivo) {
    const normalizar = (cadena) =>
        cadena
            .toLowerCase() 
            .normalize("NFD") 
            .replace(/[\u0300-\u036f]/g, ""); 

    return normalizar(respuestaUsuario) === normalizar(paisObjetivo);
}

// Función para calcular la dirección (este/oeste) entre dos longitudes
function calcularDireccion(longitud1, longitud2) {
    return longitud2 > longitud1 ? "este" : "oeste";
}

// Función para guardar datos en LocalStorage
function guardarProgreso(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Función para cargar datos desde LocalStorage
function cargarProgreso(clave) {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
}

// Función para inicializar el juego
function inicializarJuego(callback) {
    fetch("datos/paises.json")
        .then((response) => response.json())
        .then((data) => {
            const paises = data;
            const paisObjetivo = seleccionarPaisAleatorio(paises);
            renderizarSiluetaPais(paisObjetivo.nombre);
            console.log(`País objetivo: ${paisObjetivo.nombre}`); 
            callback(paises, paisObjetivo); 
        })
        .catch((error) => console.error("Error al cargar los datos de países:", error));
}

// Función para actualizar la tabla de retroalimentación
function actualizarTablaFeedback(intentos, mensaje) {
    const tabla = document.getElementById("feedback-table").querySelector("tbody");
    const fila = document.createElement("tr");

    const celdaIntento = document.createElement("td");
    celdaIntento.textContent = intentos;

    const celdaMensaje = document.createElement("td");
    celdaMensaje.textContent = mensaje;

    fila.appendChild(celdaIntento);
    fila.appendChild(celdaMensaje);
    tabla.appendChild(fila);
}

// Función para actualizar el historial de intentos con tarjetas
function actualizarHistorialFeedback(intentos, mensaje) {
    const contenedor = document.getElementById("feedback-history");

    // Crear una tarjeta para el intento
    const tarjeta = document.createElement("div");
    tarjeta.className = "feedback-card";

    // Crear el contenido de la tarjeta
    const intentoTexto = document.createElement("p");
    intentoTexto.className = "feedback-attempt";
    intentoTexto.textContent = `Intento ${intentos}:`;

    const mensajeTexto = document.createElement("p");
    mensajeTexto.className = "feedback-message";
    mensajeTexto.textContent = mensaje;

    // Agregar el contenido a la tarjeta
    tarjeta.appendChild(intentoTexto);
    tarjeta.appendChild(mensajeTexto);

    // Agregar la tarjeta al contenedor
    contenedor.appendChild(tarjeta);
}