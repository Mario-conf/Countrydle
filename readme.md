<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!--

        **Análisis de la lógica detrás de Countrydle**  
El juego **Countrydle** se basa en una combinación de reconocimiento geográfico, mecánicas de retroalimentación progresiva y un sistema de generación aleatoria de objetivos. A continuación, se desglosa su estructura lógica:

---

### 1. **Selección del país objetivo**  
- **Base de datos de países**: El juego utiliza una base de datos con más de 200 países, cada uno asociado a su contorno geográfico y coordenadas geográficas (latitud y longitud) .  
- **Generación aleatoria**: Al iniciar una partida, el sistema selecciona un país al azar como objetivo. Esto permite que cada juego sea único y evita repeticiones predecibles.  

---

### 2. **Mecánica de adivinanza**  
- **Contorno inicial**: Al comenzar, se muestra solo la silueta del país objetivo, sin nombres ni pistas adicionales. Esto obliga al jugador a depender de su conocimiento visual de geografía .  
- **6 intentos limitados**: El jugador tiene seis oportunidades para adivinar, lo que equilibra la dificultad y fomenta el uso estratégico de las pistas.  

---

### 3. **Sistema de retroalimentación**  
Tras cada intento fallido, el juego proporciona dos tipos de información clave:  
- **Porcentaje de proximidad**: Indica qué tan cerca está el país ingresado del objetivo. Por ejemplo, si el jugador escribe "Francia" y el objetivo es "España", el sistema calcula la distancia geográfica entre ambos y la convierte en un porcentaje .  
- **Dirección (este/oeste)**: Basado en la longitud geográfica, el juego señala si el país objetivo está al este u oeste del ingresado. Por ejemplo, si el objetivo es "Japón" y el jugador escribe "China", el sistema indicaría "este" .  

---

### 4. **Modos de dificultad**  
- **Contorno oculto**: Para aumentar el desafío, los jugadores pueden activar una opción que elimina la silueta inicial, obligándolos a adivinar sin referencia visual .  
- **Reinicio ilimitado**: A diferencia de versiones similares (como Wordle clásico), no hay límites diarios. Los jugadores pueden reiniciar la partida cuantas veces deseen .  

---

### 5. **Puntuación y aprendizaje**  
- **Sistema de puntos**: Se otorgan puntos según la rapidez con la que se adivine el país (por ejemplo, más puntos si se acierta en el primer intento).  
- **Refuerzo educativo**: El juego incentiva el aprendizaje de geografía al exponer al jugador a contornos menos conocidos, especialmente de regiones como África o Sudamérica, que suelen ser más desafiantes .  

---

### 6. **Tecnología y adaptabilidad**  
- **Plataforma web**: Está diseñado para funcionar en navegadores sin necesidad de descargas, usando tecnologías como HTML5 y JavaScript para renderizar los contornos y procesar las entradas del usuario .  
- **Responsive design**: Se adapta a dispositivos móviles, asegurando accesibilidad en smartphones y tablets .  

---

### **7. Algoritmo de cálculo de distancia**  
- **Centro geográfico**: La proximidad entre países no se basa en la distancia entre fronteras, sino en la distancia entre los **centros geográficos** (puntos centrales calculados matemáticamente para cada país).  
- **Normalización del porcentaje**: El porcentaje de cercanía se calcula comparando la distancia entre el país ingresado y el objetivo con la **distancia máxima posible entre dos países** (ej: Chile vs Rusia). Por ejemplo, si la distancia es 2,000 km y la máxima es 20,000 km, el porcentaje sería 90% de proximidad.  

---

### **8. Manejo de nombres y variantes**  
- **Sinónimos y traducciones**: El juego acepta nombres en varios idiomas (ej: "Germany" y "Deutschland") gracias a una lista de equivalencias en su base de datos.  
- **Validación ortográfica**: Si el jugador escribe "Arjentina" en lugar de "Argentina", el sistema usa algoritmos de **coincidencia aproximada** (como el algoritmo de Levenshtein) para sugerir correcciones.  

---

### **9. Lógica de dirección (Este/Oeste)**  
- **Longitud como eje clave**: La dirección se determina **exclusivamente por la longitud**, ignorando la latitud. Esto simplifica las pistas para evitar sobrecargar al jugador con direcciones como "noreste".  
- **Caso especial en el meridiano 180°**: Si el país objetivo está cerca de este meridiano (ej: Fiyi), el juego ajusta la lógica para evitar errores (como indicar "oeste" cuando debería ser "este").  

---

### **10. Generación de contornos**  
- **SVG optimizados**: Las siluetas se cargan como archivos **SVG vectoriales** para garantizar calidad en cualquier dispositivo. Cada contorno está simplificado para evitar detalles innecesarios (ej: islas pequeñas).  
- **Renderizado condicional**: En el modo "contorno oculto", el juego desactiva la capa visual del SVG pero mantiene sus datos geográficos para cálculos internos.  

---

### **11. Persistencia de datos**  
- **LocalStorage**: El progreso (puntuaciones, historial) se guarda en el navegador usando **LocalStorage**, no requiere servidores externos ni cuentas de usuario.  
- **Reinicio aleatorio seguro**: Para evitar que el jugador "trampee" recargando la página, la selección del país objetivo se guarda en una sesión cifrada hasta que se complete el juego.  

---

### **12. Experiencia del usuario (UX)**  
- **Microinteracciones**: Efectos visuales sutiles, como un ligero zoom al acertar el país o una vibración al fallar, refuerzan la retroalimentación.  
- **Modo colorblind**: Opción para cambiar los colores de las pistas (ej: rojo/verde a azul/amarillo) para jugadores con daltonismo.  

---

### **13. Casos límite**  
- **Países con múltiples territorios**: Para países como Francia o EE.UU., el juego prioriza el territorio principal (ej: Francia metropolitana, no Guadalupe).  
- **Reconocimiento de micronaciones**: No incluye territorios no soberanos (ej: Taiwán se maneja según estándares geopolíticos comunes).  

---

### **14. Escalabilidad**  
- **Actualizaciones geopolíticas**: La base de datos se actualiza manualmente ante cambios (ej: un nuevo país reconocido por la ONU), lo que requiere intervención del desarrollador.  



---

**Estructura del proyecto**  
Countrydle/
│
├── index.html                # Archivo principal HTML del juego.
├── estilos/
│   ├── interfaz.css         # Estilos relacionados con la interfaz del usuario.
│   └── interno.css          # Estilos internos (como clases ocultas, animaciones, etc.).
│
├── logica/
│   ├── funciones.js          # Archivo para definir funciones reutilizables.
│   └── main.js               # Archivo principal que conecta variables y funciones.
│
│
├── datos/
│   ├── paises.json        # Base de datos de países con nombres, coordenadas y equivalencias.
│
└── README.md                 # Documentación del proyecto.

---

**Conclusión final**  
La lógica de WORLDLE UNLIMITED es más sofisticada de lo que parece, integrando geografía, algoritmos de distancia y diseño centrado en el usuario. Elementos como la corrección ortográfica inteligente o el manejo de casos geopolíticos demuestran un enfoque meticuloso para equilibrar precisión y jugabilidad.
    -->
</body>
</html>