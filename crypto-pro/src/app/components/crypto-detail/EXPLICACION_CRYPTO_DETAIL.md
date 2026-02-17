# Crypto Detail (Detalle de Criptomoneda) - Análisis de Diseño

Este documento explica las decisiones de diseño y las clases de Bootstrap 5 utilizadas en el archivo `crypto-detail.html`.

## 1. Estructura y Grid (La base)

El diseño principal se divide en dos grandes áreas: la cabecera (información principal) y el cuerpo (estadísticas y gráfica).

*   **`container`**:
    *   Envuelve todo el contenido. Mantiene los márgenes laterales y centra el contenido.

*   **`row` (Fila principal)**:
    *   Divide el espacio horizontal para las estadísticas y el gráfico.

*   **`col-lg-5` (Columna Izquierda - Estadísticas)**:
    *   **¿Por qué 5?**: Ocupa un poco menos de la mitad (5/12 partes). Las listas de datos numéricos suelen necesitar menos ancho que los gráficos.
*   **`col-lg-7` (Columna Derecha - Gráfico)**:
    *   **¿Por qué 7?**: Ocupa el resto del espacio (7/12 partes). Los gráficos financieros se leen mejor cuanto más anchos son.
    *   **Suma**: $5 + 7 = 12$ (El total de columnas de Bootstrap).

*   **Responsive**:
    *   Usé el breakpoint `lg` (Large - Escritorio).
    *   **En escritorio**: Se ven lado a lado (5 y 7).
    *   **En móvil/tablet (< 992px)**: Como no especifiqué `col-md` o `col-sm`, las columnas se apilan verticalmente (100% de ancho), quedando las estadísticas arriba y el gráfico debajo, lo cual es perfecto para pantallas estrechas.

## 2. Componentes de Bootstrap Utilizados

### A. Tarjetas (`card`)
Es el contenedor principal para agrupar información.
*   **`card shadow-sm`**: Añade un borde sutil y una sombra pequeña suave (`shadow-sm`) para levantar el contenido del fondo.
*   **`card-header bg-light`**: Cabecera gris suave (`bg-light`) para diferenciar el título ("Estadísticas", "Historial") del contenido.
*   **`card-body`**: Proporciona el padding necesario alrededor del contenido.
*   **`h-100`**: Hace que la tarjeta ocupe el **100% del alto** de su columna. Esto es crucial para que la tarjeta de estadísticas y la del gráfico tengan **la misma altura** visualmente, aunque tengan distinto contenido.

### B. Listas de Grupo (`list-group`)
Usado en la tabla de estadísticas.
*   **`list-group-flush`**: Elimina los bordes externos de la lista para que encaje perfectamente dentro de una `card` sin duplicar bordes.

### C. Badges (Etiquetas)
*   **`badge bg-secondary`**: Crea la etiqueta gris pequeña para el "Rank #1". `bg-secondary` le da el color gris neutro.

### D. Spinners y Alertas (Estados de carga)
*   **`spinner-border`**: El círculo giratorio de carga.
*   **`alert alert-warning`**: Caja amarilla para mensajes de advertencia/error si no carga la cripto.

## 3. Utilidades y "Trucos" Visuales

### Centrado Absoluto (Loading)
*   **`d-flex justify-content-center align-items-center vh-100`**:
    *   Esta combinación centra el spinner **perfectamente en el medio de la pantalla**.
    *   `vh-100` (Viewport Height 100): Fuerza al contenedor a tener el alto total de la ventana. Sin esto, el spinner saldría arriba del todo.

### Flexbox en Detalles
*   **`d-flex justify-content-between align-items-center`** (En cada item de la lista):
    *   Separa el texto (izquierda) del valor (derecha) empujándolos a los extremos (`justify-content-between`) y los centra verticalmente.
*   **`gap-2` / `gap-3`**: Crea espacio entre elementos flexibles (como los botones de enlaces externos o el título y el badge) sin usar márgenes.

### Tipografía
*   **`display-4`**: Tipografía muy grande y fina para el precio principal. Le da impacto visual.
*   **`fw-bold`**: (Font-weight bold) Negrita para destacar valores numéricos.
*   **`text-muted`**: Gris para etiquetas secundarias ("Capitalización", "Volumen").

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa 1
**Profesora:** *"En la lista de estadísticas usas `list-group-flush`. ¿Qué pasaría visualmente si quitaras esa clase y dejaras solo `list-group`?"*

**Respuesta Perfecta:**
"Si quito `flush`, la lista recuperaría sus bordes externos redondeados. Como la lista está dentro de una `card`, se vería un 'doble borde' feo: el borde de la tarjeta y luego, con un poco de margen, el borde de la lista dentro. `list-group-flush` elimina los bordes externos de la lista para que se fusione limpiamente con los bordes de la tarjeta."

### Pregunta Trampa 2
**Profesora:** *"Para el loading usas `vh-100`. ¿Qué significa exactamente y por qué no usar `h-100`?"*

**Respuesta Perfecta:**
"
*   `h-100` significa el 100% de la altura del **padre**. Si el padre está vacío o es pequeño, el `div` será pequeño y el spinner no se centrará en la pantalla.
*   `vh-100` significa el 100% del **Viewport Height** (la altura de la ventana del navegador visible). Esto garantiza que, independientemente del contenido, el spinner se centre en toda la pantalla visible del usuario."
