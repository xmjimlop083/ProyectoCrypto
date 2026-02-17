# Crypto List (Lista de Criptomonedas) - Análisis de Diseño

Este documento explica las decisiones de diseño y las clases de Bootstrap 5 utilizadas en el archivo `crypto-list.html`.

## 1. Estructura y Grid (La base)

En este componente, **no utilizamos el sistema de grid** (`row`, `col`) porque el contenido es tabular por naturaleza.

*   **`container`**:
    *   El elemento raíz que envuelve todo.
    *   **Función**: Centra la tabla en la pantalla y le da márgenes laterales automáticos para que no se pegue a los bordes del monitor.
    *   **Responsive**: El ancho del `container` cambia en saltos (`sm`, `md`, `lg`, `xl`) según el tamaño de la pantalla, manteniendo el diseño consistente.

## 2. Componentes de Bootstrap Utilizados

### A. Tablas (`table`)
Este es el componente principal. Bootstrap estiliza las tablas HTML estándar de forma muy elegante.

*   **`table`**: Clase base obligatoria. Ajusta el ancho al 100% del contenedor, añade bordes suaves y alinea el texto a la izquierda.
*   **`table-striped`**:
    *   **Efecto**: Añade un color de fondo alterno (zebra-striping) a las filas (impares vs pares).
    *   **Por qué usarla**: Facilita la lectura horizontal cuando hay muchas columnas de datos, evitando que el ojo salte de fila accidentalmente.
*   **`table-hover`**:
    *   **Efecto**: Ilumina la fila sobre la que posas el ratón (hover).
    *   **Por qué usarla**: Mejora la usabilidad, indicándole al usuario exactamente con qué criptomoneda va a interactuar si hace clic.

### B. Botones (`btn`)
*   **`btn btn-primary btn-sm`**:
    *   `btn-primary`: Botón azul sólido. Lo usamos para la acción principal de la fila ("Ver Detalle").
    *   **`btn-sm` (Small)**: Reduce el tamaño (padding y fuente) del botón.
    *   **Justificación**: "Usé `btn-sm` porque están dentro de una celda de tabla (`td`). Un botón de tamaño normal (`btn`) haría que las filas fueran demasiado altas, desperdiciando espacio vertical."

## 3. Utilidades y "Trucos" Visuales

### Colores Semánticos Condicionales
Aquí usamos una mezcla de Bootstrap y la lógica de Angular (`[class.condicion]`).

*   **`text-success` (Verde)**: Se aplica si el cambio de precio es positivo (`> 0`). En finanzas, verde siempre implica ganancia.
*   **`text-danger` (Rojo)**: Se aplica si el cambio es negativo (`< 0`). Indica pérdida.
*   **Clave**: Estas clases no solo cambian el color, sino que transmiten **significado** inmediato al usuario sin tener que leer el número.

### Tipografía y Espaciado
*   **`scope="col"`**: Atributo de accesibilidad en los encabezados `<th>`. Ayuda a los lectores de pantalla a entender que esa celda es el título de toda la columna vertical.
*   **`mt-4` (Margin Top 4)**: Margen superior grande en el contenedor (~1.5rem) para separarlo del Navbar.
*   **`mb-3` (Margin Bottom 3)**: Margen inferior en el título `<h2>` para separarlo de la tabla.

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa 1
**Profesora:** *"Usas una `<table>` para mostrar los datos. Hoy en día se dice que es mala práctica maquetar con tablas. ¿Por qué no usaste `divs` con `row` y `col`?"*

**Respuesta Perfecta:**
"Es mala práctica usar tablas para el **layout** (la estructura general de la página), pero es la **mejor práctica** usar tablas para **datos tabulares** como esta lista.
Una lista de precios con encabezados fijos (Nombre, Precio, Cambio) es semánticamente una tabla. Usar `div`s aquí rompería la accesibilidad (los lectores de pantalla no podrían asociar la celda de precio con su encabezado) y complicaría el alineamiento de las columnas innecesariamente. Aquí la tabla es semánticamente correcta."

### Pregunta Trampa 2
**Profesora:** *"¿Qué pasaría si la tabla tuviera 20 columnas y la veo en un móvil? Ahora mismo se rompería el diseño. ¿Qué clase de Bootstrap soluciona eso instantáneamente?"*

**Respuesta Perfecta:**
"Efectivamente, en un móvil la tabla se saldría de la pantalla. Para arreglarlo, debería envolver toda la etiqueta `<table>` dentro de un `div` con la clase **`table-responsive`**.
Esto añadiría una barra de desplazamiento horizontal (scroll) solo a la tabla, permitiendo ver todas las columnas deslizando el dedo, sin romper el ancho del resto de la página."
