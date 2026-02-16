# Navbar (Barra de Navegación) - Análisis de Diseño

Este documento explica las decisiones de diseño y las clases de Bootstrap 5 utilizadas en el archivo `navbar.html`. Úsalo para repasar antes de tu defensa.

## 1. Estructura y Comportamiento Responsive

En este componente, la estructura no se basa en el sistema de grid tradicional (`row`, `col`), sino en el componente flexible de navegación `navbar`.

*   **`navbar navbar-expand-lg`**:
    *   **¿Qué hace?**: Define el contenedor principal de la navegación.
    *   **`expand-lg` (Large)**: Este es el punto clave del diseño responsive. Indica que la barra se mostrará "expandida" (con el menú visible horizontalmente) en pantallas grandes (Escritorio, >992px).
    *   **Versión Móvil**: En pantallas menores a `lg` (tablets y móviles), la barra se "contrae" automáticamente, ocultando el menú dentro del botón hamburguesa.
    *   **Justificación**: "Elegí el breakpoint `lg` para que en tablets verticales y móviles el menú no ocupe todo el ancho y colapse, mejorando la experiencia táctil".

*   **`container-fluid`**:
    *   **¿Qué hace?**: Crea un contenedor que ocupa el **100% del ancho** disponible de la ventana.
    *   **Diferencia con `container`**: `container` deja márgenes a los lados. Usé `fluid` para que la barra de navegación toque los bordes de la pantalla, aprovechando todo el espacio horizontal.

## 2. Componentes de Bootstrap Utilizados

### A. Navbar Completo
*   **`navbar-dark`**: Cambia el color del texto de los enlaces a un color claro (blanco/grisáceo) diseñado para usarse sobre fondos oscuros.
*   **`navbar-brand`**: Clase para el logotipo o nombre del proyecto (`CryptoDash`). Añade un tamaño de fuente mayor y elimina comportamientos estándar de los enlaces.

### B. Botón "Hamburguesa" (`navbar-toggler`)
Este botón solo aparece en móviles/tablets debido a la clase `navbar-expand-lg` mencionada arriba.
*   **`data-bs-toggle="collapse"` y `data-bs-target="#navbarNav"`**: Estos atributos de datos son **obligatorios** para el Javascript de Bootstrap. Le dicen: "Al hacer clic, colapsa o expande el elemento con ID `navbarNav`". sin escribir ni una línea de JS propio.
*   **`navbar-toggler-icon`**: Dibuja las tres rayitas horizontales (el icono del menú).

### C. El Menú Colapsable (`collapse navbar-collapse`)
*   **`id="navbarNav"`**: Es el objetivo del botón hamburguesa. Todo lo que esté dentro de este `div` se ocultará en móviles hasta que se pulse el botón.
*   **`navbar-nav`**: Convierte la lista `<ul>` en un menú de navegación flexible, quitando viñetas (bullets) y ajustando márgenes.
*   **`nav-item` y `nav-link`**: Estilian cada elemento de la lista y sus enlaces para que tengan el padding y el área de clic correctos.

## 3. Utilidades y "Trucos" Visuales

### Flexbox y Posicionamiento
*   **`d-flex`**: Utilizado en el `<form>`. Convierte el formulario en un contenedor flexible. Esto permite que el input y un futuro botón (si se añade) se alineen perfectamente en fila.
*   **`ms-auto` (Margin Start Auto)**: **¡Truco clave!** Aplicado al `<ul>` (`navbar-nav`).
    *   En Bootstrap, `start` es izquierda y `end` es derecha.
    *   Al poner "margen a la izquierda automático", empujas todo el elemento hacia la **derecha**.
    *   **Efecto**: Esto es lo que hace que los enlaces "Inicio", "Lista Criptos" y "Contacto" se vayan al lado derecho de la barra, separándose del buscador.

### Espaciado (Spacing Utilities)
*   **`me-2` (Margin End 2)**: En el input del buscador. Añade un pequeño margen a la derecha (~0.5rem) para que, si hubiese un botón de búsqueda al lado, no estuvieran pegados.
*   **`mb-2 mb-lg-0`**:
    *   `mb-2`: Margen inferior (bottom) pequeño en vista móvil. Separa los enlaces entre sí cuando están en lista vertical.
    *   `mb-lg-0`: Elimina ese margen en pantallas grandes (`lg`). En escritorio queremos que estén en línea, no que tengan espacio debajo.

### Formularios
*   **`form-control`**: La clase mágica para inputs. Les da el ancho, bordes redondeados, el brillo azul al hacer foco `focus` y un aspecto moderno instantáneo.
*   **`role="search"`**:
    *   **¿Qué hace?**: Indica explícitamente a los navegadores y tecnologías de asistencia (lectores de pantalla) que este formulario tiene una función específica: **buscar** contenido.
    *   **Por qué es importante**: Sin esto, un ciego solo escucharía "formulario". Con esto, escuchará "barra de búsqueda", sabiendo inmediatamente para qué sirve. Es otro punto clave de accesibilidad y buenas prácticas semánticas.

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa 1
**Profesora:** *"Veo que usas `navbar-expand-lg`. ¿Qué pasaría exactamente si cambiamos esa clase por `navbar-expand-sm`?"*

**Respuesta Perfecta:**
"Si lo cambiamos a `sm` (small), el menú hamburguesa desaparecería mucho antes, solo se vería en móviles muy pequeños. En tablets y móviles grandes el menú se vería expandido horizontalmente. Mantuve `lg` porque mi menú tiene buscador y varios enlaces, y en una tablet vertical podría verse todo apretado si no lo colapso."

### Pregunta Trampa 2
**Profesora:** *"¿Para qué sirve el atributo `aria-label` y `aria-controls` en el botón del menú? Si los quito, el menú sigue funcionando visualmente."*

**Respuesta Perfecta:**
"Funcionaría visualmente para mí, pero rompería la **Accesibilidad**. Esos atributos son para lectores de pantalla que usan las personas ciegas. `aria-label='Toggle navigation'` les dice en voz alta que ese botón sirve para abrir el menú, ya que ellos no pueden ver el icono de las tres rayitas. Es fundamental para un desarrollo web inclusivo y profesional."
