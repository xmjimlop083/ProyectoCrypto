# Crypto Service - Análisis de Lógica y Datos

Este documento explica el funcionamiento del servicio `crypto.ts`, el "cerebro" encargado de traer los datos desde la API de CoinGecko.

## 1. Conceptos Fundamentales de Angular

### A. `@Injectable({ providedIn: 'root' })`
*   **¿Qué es?**: Este decorador marca la clase como un **Servicio**.
*   **`providedIn: 'root'`**: Significa que Angular crea una **única instancia** (Singleton) de este servicio para toda la aplicación.
*   **Beneficio**: Cualquier componente que pida `Crypto` recibirá las mismas variables y datos. Es crucial para compartir el estado (como la búsqueda semántica).

### B. Signals (`signal<string>('')`)
*   **¿Qué es?**: La nueva forma reactiva de Angular (v16+) para manejar el estado.
*   **Uso aquí**: `searchQuery` almacena lo que el usuario escribe en la barra de búsqueda del Navbar. Como es un Signal, Angular "avisa" automáticamente a cualquier componente que lo esté usando (como la lista de criptos) cuando el valor cambia, sin necesidad de observables complejos (`Subject` o `BehaviorSubject`).

## 2. Peticiones HTTP (`HttpClient`)

### A. Inyección de Dependencias
```typescript
constructor(private http: HttpClient) {}
```
Angular nos "inyecta" automáticamente el cliente HTTP para poder hacer llamadas a internet. No usamos `fetch` de JavaScript nativo, sino `HttpClient` porque devuelve **Observables**, que son mucho más potentes.

### B. Construcción de Parámetros (`HttpParams`)
En lugar de escribir la URL a mano y arriesgarnos a errores tipográficos (`?vs_currency=eur&order=...`), usamos `HttpParams`:
*   **`set('vs_currency', 'eur')`**: Definimos la moneda base (Euro).
*   **`set('order', 'market_cap_desc')`**: Ordenamos por capitalización de mercado (las más importantes primero: Bitcoin, Ethereum...).
*   **`set('per_page', 100)`**: Pedimos las top 100.
*   **Seguridad**: `HttpParams` se encarga de codificar caracteres extraños en la URL automáticamente.

## 3. RxJS y Manejo de Errores

### Observables (`Observable<CryptoCurrency[]>`)
Los métodos no devuelven "datos" (arrays), devuelven un "flujo de datos" (Stream) al que los componentes se tienen que **suscribir** (`.subscribe()`).

### Operadores (`pipe` y `catchError`)
```typescript
.pipe(
  catchError((error) => { ... })
)
```
*   **`pipe`**: Es una tubería por donde pasan los datos antes de llegar al componente.
*   **`catchError`**: Si la API falla (ej: error 404, servidor caído, sin internet), este bloque captura el error.
*   **`throwError`**: Re-lanza el error de una forma controlada para que el componente sepa que algo falló y pueda mostrar una alerta al usuario.

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa 1
**Profesora:** *"Veo que usas `HttpParams` que son inmutables. ¿Por qué no concatenas simplemente strings en la URL? Es más fácil leer `url + '?vs_currency=eur'`."*

**Respuesta Perfecta:**
"Concatenar strings es propenso a errores humanos (olvidar el `&` entre parámetros) y de seguridad (inyección de parámetros).
`HttpParams` maneja automáticmente la codificación de caracteres especiales (espacios, acentos) que podrían romper la URL. Además, al ser inmutable, garantiza que la configuración de la petición es predecible y testable."

### Pregunta Trampa 2
**Profesora:** *"¿Por qué `getCryptoDetail` devuelve `Observable<any>` en lugar de una interfaz tipada como `CryptoDetail`? ¿No es eso una mala práctica en TypeScript?"*

**Respuesta Perfecta:**
"Sí, idealmente debería haber creado una interfaz completa para la respuesta del detalle. Sin embargo, la API de CoinGecko devuelve un objeto JSON gigantesco y anidado para el detalle de una moneda. Por pragmatismo y tiempo, usé `any` para acceder solo a los campos que necesitaba (`description`, `market_data`) sin tener que tipar cientos de propiedades que no iba a usar. En un entorno profesional con más tiempo, definiría una interfaz `Partial<CryptoDetail>`."
