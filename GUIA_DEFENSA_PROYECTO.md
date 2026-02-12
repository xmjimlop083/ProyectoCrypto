# Guía de Defensa del Proyecto: CryptoDash

Esta guía está diseñada para prepararte para el examen oral de tu proyecto. No solo explica *qué* hace tu código, sino *por qué* se tomaron esas decisiones técnicas, basándonos en las últimas prácticas de Angular 19+ y desarrollo web moderno.

---

## 1. Arquitectura del Proyecto (Angular 19)

### 1.1 Standalone Components (Componentes Autónomos)
Tu proyecto utiliza la arquitectura más moderna de Angular: **Standalone Components**.

*   **¿Qué son?**
    Antiüamente, en Angular cada componente debía declararse en un archivo llamado `NgModule` (usualmente `app.module.ts`). Ahora, los componentes son autosuficientes.
*   **En tu código:**
    Fíjate en `home.ts` o `contact.ts`. Tienen la propiedad `standalone: true` (implícita en Angular 19, pero visible por la propiedad `imports`):
    ```typescript
    @Component({
      selector: 'app-home',
      imports: [RouterLink, CommonModule], // Importan directamente lo que necesitan
      templateUrl: './home.html',
      // ...
    })
    ```
*   **¿Por qué es mejor?**
    1.  **Menos código:** Eliminamos la complejidad de los NgModules.
    2.  **Carga diferida (Lazy Loading):** Es mucho más fácil cargar partes de la web solo cuando se necesitan, mejorando la velocidad inicial.
    3.  **Claridad:** Mirando el archivo del componente, sabes exactamente qué dependencias usa.

### 1.2 Estructura de Carpetas
Tu estructura sigue el principio de **Separación de Responsabilidades (Sole)**:

*   `src/app/components/`: Contiene la lógica visual (UI). Cada carpeta (`home`, `contact`, `crypto-list`) encapsula su HTML, CSS y TS. Esto hace que el mantenimiento sea fácil; si falla el contacto, vas a la carpeta `contact`.
*   `src/app/services/`: Contiene `crypto.ts`. Aquí vive la **lógica de negocio** y la comunicación con datos externos. Los componentes no deben saber *cómo* se piden los datos, solo *mostrarlos*.
*   **Interfaces (dentro de crypto.ts):** `CryptoCurrency`. Define el "contrato" de los datos. TypeScript nos avisa si intentamos acceder a una propiedad que no existe, evitando errores en tiempo de ejecución.

---

## 2. Gestión de Datos y Reactividad (El Core)

Este es el punto más importante para aprobar. Debes dominar la diferencia entre Observables y Signals.

### 2.1 Inyección de Dependencias (DI)
En `crypto.ts` tienes:
```typescript
@Injectable({ providedIn: 'root' })
export class Crypto { ... }
```
*   **Explicación:** `@Injectable` le dice a Angular: "Esta clase es un servicio. Créala una sola vez (Singleton) y dásela a quien la pida".
*   **Uso:** En `home.ts`, el constructor recibe `private cryptoService: Crypto`. Angular automáticamente busca la instancia creada y te la entrega. No tienes que hacer `new Crypto()`.

### 2.2 Observables (HttpClient) vs. Signals (Estado Local)

Tu aplicación es híbrida, lo cual es excelente.

#### **A. HttpClient & Observables (RxJS)**
Usado para **Eventos Asíncronos** (peticiones HTTP).
*   **Código:**
    ```typescript
    getCryptos(): Observable<CryptoCurrency[]> {
      return this.http.get<CryptoCurrency[]>(this.apiUrl, { params })...
    }
    ```
*   **Por qué Observables:** Las peticiones a Internet son flujos de datos que ocurren en el tiempo. Pueden tardar, fallar, o cancelarse. Los Observables (`rxjs`) son perfectos para gestionar esto (con operadores como `catchError`).
*   **Suscripción:** En `home.ts`, usas `.subscribe()`. Es como decir: "Avísame cuando lleguen los datos".

#### **B. Signals (Angular 16+)**
Usado para **Gestión de Estado Sincrónico** y Reactividad granular.
*   **Código (en `crypto.ts`):** `searchQuery = signal<string>('');`
*   **Código (en `navbar.ts`):** `this.cryptoService.searchQuery.set(valor);`
*   **Por qué Signals:** Son la nueva forma de manejar datos cambiantes.
    1.  **Eficiencia:** Cuando un Signal cambia, Angular actualiza *exactamente* el lugar donde se usa ese dato, sin revisar todo el árbol de componentes.
    2.  **Sencillez:** No requieren `.subscribe()` ni desuscribirse para evitar fugas de memoria. Tienen un valor siempre disponible (`searchQuery()`).

### 2.3 El Flujo de Datos
1.  **API:** CoinGecko recibe la petición.
2.  **Servicio (`crypto.ts`):** Recibe el JSON crudo y lo devuelve como Observable.
3.  **Componente (`home.ts` / `crypto-list.ts`):** Se suscribe al Observable, recibe los datos y los guarda en un Signal local (`featuredCryptos.set(...)`) o variable.
4.  **Vista (HTML):** Angular detecta el cambio en el Signal y repinta el DOM automáticamente usando la sintaxis de control de flujo (`@for`, `@if`).

---

## 3. Desglose por Componentes

### 3.1 Home (Carrusel y Estilos)
*   **Carrusel Manual:** Utilizas Bootstrap para la estructura (`carousel`, `carousel-item`), pero controlas la lógica de datos con Angular.
*   **Limitación:** En `home.ts` haces: `data.slice(0, 3)`. Esto asegura que de las 100 criptos que bajas, solo muestras las 3 más importantes en la portada.
*   **Control de Flujo:** Usas `@if (featuredCryptos().length > 0)` para mostrar un *spinner* de carga mientras los datos llegan. Esto mejora la experiencia de usuario (UX).

### 3.2 Lista (Filtrado Computado)
*(Nota: Aunque no pasaste `crypto-list.ts`, inferimos su funcionamiento por `navbar.ts` y `crypto.ts`)*.
Es probable que en tu lista uses `computed()`.
*   **¿Cómo funciona?** Un `computed` depende de otros signals (ej: `listaOriginal` y `searchQuery`). Si el usuario escribe en el Navbar (`searchQuery` cambia), el `computed` se recalcula automáticamente filtrando la lista. ¡Magia reactiva!
*   **Pipes:** En el HTML usas `{{ crypto.current_price | currency:'EUR' }}`. Los Pipes transforman datos visualmente sin cambiar el dato real.

### 3.3 Contacto (Formularios Reactivos)
*   **ReactiveFormsModule:** Te da control total desde el TypeScript.
*   **Validaciones:**
    ```typescript
    from_email: ['', [Validators.required, Validators.email]],
    ```
    Si el usuario no cumple estas reglas, `this.contactForm.invalid` es `true`.
*   **Botón Deshabilitado:** En el HTML: `[disabled]="contactForm.invalid || isSending"`. El botón no funciona si hay errores O si se está enviando.
*   **EmailJS:** Es una librería externa que devuelve una `Promise` (`.then()`). A diferencia de los Observables (que son flujos), una promesa ocurre una sola vez (éxito o fallo), ideal para enviar un correo.

---

## 4. Diseño y Maquetación (Bootstrap 5)

### 4.1 Sistema de Grid (Rejilla)
Bootstrap divide la pantalla en 12 columnas invisibles.
*   **`container`:** Centra el contenido y le da márgenes laterales.
*   **`row`:** Crea una fila horizontal.
*   **`col-md-4`:** "Ocupa 4 columnas (de 12) en pantallas medianas (escritorio) o más grandes". 4+4+4 = 12, por eso tienes 3 tarjetas en fila en el Home.

### 4.2 Utilidades Flexbox
*   **`d-flex`:** Activa Flexbox. Transforma los elementos hijos para poder alinearlos.
*   **`justify-content-between`:** (En `crypto-detail`). Pone un elemento a la izquierda (texto) y otro a la derecha (precio), repartiendo el espacio sobrante en medio.
*   **`align-items-center`:** Centra verticalmente. Vital para que el icono de la cripto quede alineado con el texto.

### 4.3 Responsive Design
Gracias a las clases con prefijos (`md`, `lg`), tu web se adapta:
*   En móvil (`col-12` implícito): Las tarjetas se apilan una debajo de otra (stacking).
*   En escritorio (`col-md-4`): Se ponen una al lado de la otra.

---

## 5. Posibles Preguntas del Profesor (Simulacro)

### P1: "¿Por qué usas `signal` para el buscador en lugar de una variable normal o un `Subject` de RxJS?"
**Respuesta:** "Porque `Signal` es la primitiva reactiva nativa moderna de Angular. A diferencia de una variable normal, Angular 'sabe' cuándo cambia un Signal y actualiza la vista de forma granular sin necesidad de usar `Zone.js` (en el futuro). A diferencia de un `Subject`, el Signal siempre tiene un valor actual accesible sin suscripción asíncrona, lo que simplifica pasar el término de búsqueda desde el Navbar a la lista de criptos."

### P2: "Veo que tienes lógica en `crypto.ts`. ¿Por qué no haces la llamada `http.get` directamente en el componente?"
**Respuesta:** "Por el principio de Responsabilidad Única y Reutilización. Si llamara a la API en el componente, estaría mezclando lógica visual con lógica de datos. Además, al tenerlo en un servicio centralizado (`Crypto`), puedo reutilizar la función `getCryptos()` en el Home, en la Lista y en cualquier otro sitio sin duplicar código. También facilita el testing y el mantenimiento si cambia la URL de la API."

### P3: "En el formulario de contacto, ¿qué diferencia hay entre `Template-driven` forms y `Reactive` forms que usaste?"
**Respuesta:** "Elegí Formularios Reactivos (`FormGroup`, `FormControl`) porque la lógica de validación reside en el TypeScript (`Validators.required`, etc.), lo que es más robusto y testable. Los formularios basados en plantillas definen la lógica en el HTML, lo que se vuelve desordenado en formularios complejos. Además, los reactivos me permiten observar cambios de valor en tiempo real de forma más limpia."

### P4: "En `app.config.ts` veo `provideHttpClient()`. ¿Qué hace esto?"
**Respuesta:** "Al ser una aplicación `Standalone`, ya no tenemos `AppModule`. `provideHttpClient()` es la nueva forma de registrar el servicio HTTP globalmente en el sistema de inyección de dependencias de Angular, permitiendo que `HttpClient` pueda ser inyectado en mi servicio `Crypto`."

### P5: "¿Cómo gestionas los errores si la API de CoinGecko se cae?"
**Respuesta:** "En el servicio `crypto.ts`, utilizo el operador pipe `catchError` de RxJS dentro del flujo del Observable. Esto intercepta el fallo HTTP, imprime el error en consola para depuración y retorna un `throwError`. En la UI (como en el componente Home), tengo bloques `@if` o variables de estado de carga que permiten mostrar un mensaje al usuario o un spinner, evitando que la página se quede en blanco."
