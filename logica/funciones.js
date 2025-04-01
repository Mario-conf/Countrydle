// Función para seleccionar un país al azar de una lista
function seleccionarPaisAleatorio(listaPaises) {
    const indiceAleatorio = Math.floor(Math.random() * listaPaises.length);
    return listaPaises[indiceAleatorio];
}

// Función para calcular la distancia entre dos coordenadas geográficas (en kilómetros)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
}

// Función para renderizar la silueta del país en el contenedor
function renderizarSiluetaPais(nombrePais) {
    const contenedor = document.getElementById("country-contour");
    contenedor.innerHTML = `<img src="assets/countries/${nombrePais}.svg" alt="Silueta de ${nombrePais}">`;
}

// Función para mostrar retroalimentación al usuario
function mostrarRetroalimentacion(mensaje, tipo) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = mensaje;
    feedback.className = tipo; // Cambia la clase para aplicar estilos (ej. "correcto", "incorrecto")
}

// Función para validar la respuesta del usuario
function validarRespuesta(respuestaUsuario, paisObjetivo) {
    return respuestaUsuario.trim().toLowerCase() === paisObjetivo.trim().toLowerCase();
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
            console.log(`País objetivo: ${paisObjetivo.nombre}`); // Para depuración
            callback(paises, paisObjetivo); // Llamar al callback para pasar los datos
        })
        .catch((error) => console.error("Error al cargar los datos de países:", error));
}