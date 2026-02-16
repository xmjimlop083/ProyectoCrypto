# Home (Página Principal) - Análisis de Diseño

Este documento explica las decisiones de diseño y las clases de Bootstrap 5 utilizadas en el archivo `home.html`.

## 1. Estructura y Grid (La base)

En este componente, utilizamos la estructura de grid de Bootstrap para la sección de características al final de la página, pero primero estructuramos los bloques principales.

*   **`container`**:
    *   Aparece tres veces envolviendo las secciones principales (Hero, Carrusel, Características).
    *   **Función**: Mantiene el contenido centrado en la pantalla con un ancho máximo predefinido, evitando que se "desparrame" hasta los bordes en pantallas muy anchas (como monitores 4K).

*   **`row` y `col-md-4` (Sección de Características)**:
    *   **Estructura**: `row` crea una fila horizontal, y dentro pongo tres `div` con la clase `col-md-4`.
    *   **¿Por qué `col-md-4`?**:
        *   El sistema de grid tiene 12 columnas en total.
        *   Al usar `col-md-4`, estoy diciendo: "Ocupa 4 de 12 espacios". Matemáticamente: $12 / 4 = 3$. Por eso caben **3 elementos** en una fila.
    *   **Responsive**:
        *   **Escritorio (`md` en adelante)**: Se ven 3 columnas lado a lado.
        *   **Móvil (< 768px)**: Como no definí `col-xs` o `col-sm`, por defecto las columnas se apilan verticalmente (pasan a ocupar el 100% del ancho o `col-12`). Esto asegura que en el móvil se lean las características una debajo de la otra en lugar de apretujadas.

## 2. Componentes de Bootstrap Utilizados

### A. Carrusel (`carousel`)
Este es el componente más complejo del archivo. Se usa para mostrar las criptomonedas destacadas.
*   **`carousel slide`**: Clases obligatorias para inicializar el componente y darle la animación de deslizamiento.
*   **`data-bs-ride="carousel"`**: Atributo automático que hace que el carrusel empiece a moverse solo al cargar la página.
*   **`carousel-inner`**: Contenedor obligatorio que envuelve todos los slides.
*   **`carousel-item`**: Define cada una de las "diapositivas".
*   **`[class.active]="first"`**: **CRUCIAL**. Un carrusel de Bootstrap NO FUNCIONA si uno de los items no tiene la clase `active`. Aquí uso Angular para asignársela dinámicamente solo al primer elemento del array.
*   **Controles (`carousel-control-prev/next`)**: Botones estándar para navegar manualmente.

### B. Botones (`btn`)
*   **`btn btn-outline-light btn-lg`**:
    *   `btn`: Clase base.
    *   `btn-outline-light`: Botón transparente con borde blanco y texto blanco. Al pasar el ratón (hover), se vuelve blanco con texto oscuro. Ideal para fondos oscuros (Hero section).
    *   `btn-lg`: Botón grande (Large), para llamar la atención (Call to Action).

### C. Spinners (Indicador de carga)
*   **`spinner-border text-primary`**:
    *   Crea el círculo giratorio de carga.
    *   `text-primary`: Lo pinta del color azul estándar de Bootstrap (o el primario del tema).
    *   Se muestra gracias al `@else` de Angular cuando no hay datos.

## 3. Utilidades y "Trucos" Visuales

### Espaciado (Spacing)
*   **`mt-5 mb-5`**: Margen top y bottom de nivel 5 (aprox 3rem o 48px). Se usa para separar mucho las secciones entre sí y dar "aire" al diseño.
*   **`mb-4`**: Margen inferior medio para separar títulos de su contenido.
*   **`p-5`**: Padding (relleno interno) grande dentro del slide del carrusel para centrar y destacar el contenido de la criptomoneda.

### Tipografía y Estilos
*   **`text-center`**: Centra el texto horizontalmente. Usado en casi todos los bloques para una presentación simétrica.
*   **`lead`**: Clase especial de Bootstrap para párrafos. Aumenta ligeramente el tamaño de fuente y la hace más fina. Ideal para subtítulos o introducciones.
*   **`display-1`**: Usado en los emojis (🚀, 🔒, 📊). Es un tamaño de fuente GIGANTE, mucho más grande que h1.
*   **`text-muted`**: Color de texto grisáceo. Se usa para información secundaria (símbolo de la moneda, descripciones breves) para quitarle peso visual frente a los títulos.
*   **`fw-bold`**: (Font Weight Bold). Pone el texto en negrita.
*   **`visually-hidden`**: Oculta el texto "Previous/Next/Cargando" visualmente, pero lo deja disponible para lectores de pantalla (Accesibilidad).

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa 1
**Profesora:** *"En el carrusel, usas `[class.active]="first"`. ¿Qué pasaría si olvidaras poner esa condición y ningún `carousel-item` tuviera la clase `active`?"*

**Respuesta Perfecta:**
"El carrusel sería invisible. Bootstrap funciona con estilos CSS donde `carousel-item` tiene `display: none` por defecto, y solo `carousel-item.active` tiene `display: block`. Si ninguno tiene la clase `active` inicial, el contenedor `carousel-inner` tendría altura 0 o simplemente no mostraría nada, pareciendo que la página está rota."

### Pregunta Trampa 2
**Profesora:** *"Veo que usas `col-md-4` para las tarjetas de características. Si quisieras que en una tablet (tamaño `sm`) se vieran 2 tarjetas arriba y 1 abajo centrada, ¿cómo cambiarías las clases?"*

**Respuesta Perfecta:**
"Para lograr eso cambiaría la clase a `col-sm-6 col-md-4`.
*   `col-sm-6`: En tablets pequeñas, cada tarjeta ocuparía la mitad (6/12), por lo que cabrían 2 en la primera fila y la tercera bajaría.
*   Para centrar esa tercera tarjeta que baja sola, tendría que añadir `justify-content-center` a la fila padre (`row`)."
