# Análisis de Pipes (Transformación de Datos)

Este documento explica los **Pipes** de Angular utilizados en todo el proyecto (`home`, `list`, `detail`).
Un Pipe es una función que toma un dato (entrada), lo transforma visualmente y lo muestra (salida), **sin modificar el dato real** en la lógica.

---

## 1. CurrencyPipe (`| currency`)
Se utiliza para formatear precios monetarios. Es el más complejo porque tiene varios parámetros.

**Ejemplo simple (Home):**
```html
{{ crypto.current_price | currency:'EUR' }}
```
*   **`'EUR'`**: Indica el código de la moneda (Euro). Angular añade automáticamente el símbolo `€` al final (o al principio según el idioma configurado).

**Ejemplo avanzado (Detail):**
```html
{{ market_cap | currency:'EUR':'symbol':'1.0-0' }}
```
*   **`'EUR'`**: Moneda (Euro).
*   **`'symbol'`**: Le dice a Angular: "Muestra el símbolo (€), no el código (EUR)".
*   **`'1.0-0'`**: Formato de dígitos (ver explicación abajo en `DecimalPipe`). Aquí significa: "No quiero decimales".

---

## 2. DecimalPipe (`| number`)
Se usa para dar formato a números que no son necesariamente dinero (como porcentajes o cantidades), o cuando queremos un control muy fino sobre los decimales.

**La sintaxis clave: `'minEnteros.minDecimales-maxDecimales'`**

### Caso A: Precio en Lista (`1.2-2`)
```html
{{ price | number:'1.2-2' }}
```
*   **`1`**: Mínimo **1** dígito entero antes de la coma (si es `0.5`, muestra `0.5`, no `.5`).
*   **`2` (Min)**: Mínimo **2** decimales. Si el precio es `50`, muestra `50.00`.
*   **`2` (Max)**: Máximo **2** decimales. Si el precio es `50.1234`, lo redondea a `50.12`.
*   **Uso**: Estándar para precios.

### Caso B: Capitalización de Mercado (`1.0-0`)
```html
{{ market_cap | number:'1.0-0' }}
```
*   **`0` (Min)**: No quiero decimales obligatorios.
*   **`0` (Max)**: **Prohibido mostrar decimales**. Redondea al entero más cercano.
*   **Uso**: Para cifras gigantes (millones de euros) donde los céntimos ocupan espacio y no aportan valor.

---

## 3. UpperCasePipe (`| uppercase`)
Es puramente estético.

```html
{{ crypto.symbol | uppercase }}
```
*   **Función**: Transforma el texto a MAYÚSCULAS.
*   **Ejemplo**: Si la API devuelve `btc` (bitcoin), el usuario ve `BTC`.
*   **Por qué usarlo**: Las siglas de acciones y criptomonedas (tickers) se escriben siempre en mayúsculas por convención financiera.

---

## 4. Preguntas de Examen (Simulacro)

### Pregunta Trampa
**Profesora:** *"Veo que usas el pipe `number:'1.2-2'` en la vista HTML. ¿Por qué no redondeas el número directamente en el archivo TypeScript antes de enviarlo a la vista?"*

**Respuesta Perfecta:**
"Porque **no debemos modificar los datos originales** solo por razones estéticas.
Si redondeo el número en el TypeScript, pierdo precisión matemática. Si luego necesito usar ese precio para un cálculo (ej: multiplicar por cantidad), el resultado sería erróneo.
El Pipe solo cambia **cómo se ve** el dato, pero el dato real sigue teniendo todos sus decimales intactos en memoria. Es el principio de 'Separación de Responsabilidades': el TS maneja lógica/datos, el HTML maneja presentación."
