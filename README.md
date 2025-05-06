# technical-test-2025-1
Juan Sebastian Naranjo Jimenez - 1001095382.
## Descripción
Esta API permite gestionar actividades con funcionalidades para crear, consultar, actualizar y contar actividades. Está desarrollada con Flask y soporta solicitudes CORS.

## Endpoints

### 1. Crear una actividad
**URL:** `/actividades`  
**Método:** `POST`  
**Descripción:** Crea una nueva actividad.  

**Cuerpo de la solicitud (JSON):**
```json
{
  "nombre_auxiliar": "string",
  "documento_auxiliar": "string",
  "fecha_inicio": "DD-MM-YYYY",
  "fecha_fin": "DD-MM-YYYY",
  "descripcion": "string"
}
```

### 2. Obtener actividades
**URL:** `/actividades`  
**Método:** `GET`  
**Descripción:** Obtiene una lista de actividades con filtros opcionales.  

**Parámetros de consulta (query params):**
- `documento_auxiliar` (opcional): Filtra por el documento del auxiliar.
- `id` (opcional): Filtra por el ID de la actividad.
- `estado` (opcional): Filtra por el estado de la actividad (`aprobada`, `en espera`, `rechazada`).

**Respuestas:**
- **200:** Lista de actividades (puede estar vacía).
  **Ejemplo de respuesta:**
  ```json
  [
    {
      "id": 1,
      "nombre_auxiliar": "Juan Perez",
      "documento_auxiliar": "123456789",
      "fecha_inicio": "01-05-2025",
      "fecha_fin": "05-05-2025",
      "descripcion": "Revisión de documentos",
      "estado": "en espera"
    }
  ]
  ```
- **400:** Error en la validación de los filtros.

---

### 3. Actualizar el estado de una actividad
**URL:** `/actividades/<int:id_actividad>/estado`  
**Método:** `PUT`  
**Descripción:** Actualiza el estado de una actividad específica.  

**Cuerpo de la solicitud (JSON):**
```json
{
  "estado": "aprobada"
}
```
**Respuestas:**
- **200:**  Actividad actualizada exitosamente.
- **400:** Estado inválido.
- **404:** Actividad no encontrada.

---

### 4. Contar actividades
**URL:** `/actividades/contar`  
**Método:** `GET`  
**Descripción:** Calcula la cantidad de actividades con filtros opcionales.  

**Parámetros de consulta (query params):**
- `documento_auxiliar` (opcional): Filtra por el documento del auxiliar.
- `fecha` (opcional): Filtra por la fecha de inicio (`DD-MM-YYYY`).

**Respuestas:**
- **200:** Devuelve la cantidad de actividades que cumplen con los filtros.  
  **Ejemplo de respuesta:**
  ```json
  {
    "fecha": "todas",
    "documento_auxiliar": "123456789",
    "total_actividades": 1
  }
  ```
- **400:**  Error en el formato de la fecha.

## Estados permitidos
Los estados válidos para las actividades son:
- `aprobada`
- `en espera`
- `rechazada`

---

## Ejecución
Para ejecutar la API, sigue estos pasos:

1. Asegúrate de tener Python instalado en tu sistema.
2. Instala las dependencias necesarias ejecutando el siguiente comando en la terminal:
   ```bash
   pip install flask flask-cors
   ```
3. Ejecuta el archivo `main.py`
4. La API estará disponible en `http://127.0.0.1:5000`

## Ejemplos para probar la API en Postman

### 1. Crear una actividad
**Método:** `POST`  
**URL:** `http://127.0.0.1:5000/actividades`  
**Cuerpo (JSON):**
```json
{
  "nombre_auxiliar": "Juan Perez",
  "documento_auxiliar": "123456789",
  "fecha_inicio": "01-05-2025",
  "fecha_fin": "05-05-2025",
  "descripcion": "Revisión de documentos"
}
```
**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre_auxiliar": "Juan Perez",
  "documento_auxiliar": "123456789",
  "fecha_inicio": "01-05-2025",
  "fecha_fin": "05-05-2025",
  "descripcion": "Revisión de documentos",
  "estado": "en espera"
}
```
### 2. Obtener actividades
**Método:** `GET`  
**URL:** `http://127.0.0.1:5000/actividades`  
**Respuesta espeada:**
```json
[
  {
    "id": 1,
    "nombre_auxiliar": "Juan Perez",
    "documento_auxiliar": "123456789",
    "fecha_inicio": "01-05-2025",
    "fecha_fin": "05-05-2025",
    "descripcion": "Revisión de documentos",
    "estado": "en espera"
  }
]
```
### 3. Actualizar el estado de una actividad
**Método:** `PUT`  
**URL:** `http://127.0.0.1:5000/actividades/1/estado`  
**Cuerpo (JSON):**
```json
{
  "estado": "aprobada"
}
```
**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre_auxiliar": "Juan Perez",
  "documento_auxiliar": "123456789",
  "fecha_inicio": "01-05-2025",
  "fecha_fin": "05-05-2025",
  "descripcion": "Revisión de documentos",
  "estado": "aprobada"
}
```
### 4. Contar actividades
**Método:** `GET`  
**URL:** `http://127.0.0.1:5000/actividades/contar?documento_auxiliar=123456789`  
**Respuesta esperada:**
```json
{
  "fecha": "todas",
  "documento_auxiliar": "123456789",
  "total_actividades": 1
}
```





