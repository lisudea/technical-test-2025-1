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

