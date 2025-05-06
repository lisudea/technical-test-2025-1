# Registro de Actividades - Frontend (Prueba Técnica LIS) ![Versión del Proyecto](https://img.shields.io/badge/tag-v1.0.0-blue) [![React](https://img.shields.io/badge/React-%2361DAFB.svg?logo=react&logoColor=black)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

## Desarrollador Frontend - Jhomar Arrieta

### Tecnologías y Herramientas Utilizadas
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white)
- ![React Bootstrap](https://img.shields.io/badge/React--Bootstrap-563D7C?logo=bootstrap&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-%235A29E4.svg?logo=axios&logoColor=white)
- ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white)

> [!IMPORTANT]
> Este proyecto frontend consume servicios de un backend que se encuentra en la **misma carpeta de repositorio**, pero en una **rama diferente** llamada `1068136291-reto2`. Para el correcto funcionamiento local, **el backend debe clonarse y ejecutarse desde esa rama específica** antes de iniciar este frontend.

---

# Registro de Actividades - Frontend con React + Vite

Este proyecto frontend implementa la interfaz de usuario para registrar, visualizar, filtrar y actualizar (aprobar/rechazar) actividades de auxiliares, interactuando con un API backend.

Fue inicializado y se ejecuta utilizando **Vite**.

## Requisitos Previos

- Node.js: `v22.15.0` (o compatible)
- npm: `10.9.2` (o compatible)
- Git
- Un servidor backend ejecutándose desde la rama `1068136291-reto2` del mismo repositorio (esperado en `http://localhost:8080/api`).

## Instalación y Ejecución Local

Sigue estos pasos cuidadosamente para ejecutar ambos, backend y frontend:

1.  **Clona el repositorio (si aún no lo has hecho):**

2.  **Ejecuta el Backend:**
    * Instrucciones en README.md de rama 1068136291-reto2
    * Verifica que el backend esté corriendo, usualmente en `http://localhost:8080`.

3.  **Ejecuta el Frontend:**
   * Instala las dependencias del frontend:
     ```bash
     npm install
     ```
   * Inicia el servidor de desarrollo del frontend (Vite):
        ```bash
        npm run dev
        ```
  * Abre tu navegador y ve a `http://localhost:5173/` (o el puerto que Vite indique, si este es diferente al 5173 deberas cambiarlo tambien en el config del CORS del back).

    ![image](https://github.com/user-attachments/assets/b96f9a75-0801-4e8c-a140-99e51a9d79a0)



## Consideraciones de Diseño y Arquitectura

-   **UI Framework:** Se utiliza `react-bootstrap` para la estructura visual (Layout, Pestañas, Formularios, Botones), agilizando el desarrollo de la interfaz.
-   **Componentes:** La aplicación se divide en componentes funcionales (`App`, `ActividadForm`, `ActividadList`, `ActividadItem`) escritos en TypeScript con React.
-   **Manejo de Estado:** El estado principal (lista de actividades, filtros) se gestiona localmente dentro del componente `App.tsx` utilizando los hooks `useState` y `useEffect` de React.
-   **Llamadas API:** Se utiliza la librería `axios` para realizar las peticiones HTTP (GET, POST, PUT) al API backend. La URL base del API (`http://localhost:8080/api`) está definida directamente en las llamadas.
-   **Organización:** La lógica de la UI y el manejo de datos/filtros se concentra en `App.tsx`, mientras que `ActividadForm` y `ActividadList` son componentes más específicos para sus respectivas tareas.

## Funcionalidades Clave

-   **Crear Actividades:** Un formulario permite registrar nuevas actividades enviando los datos al backend.
-   **Listar Actividades:** Se muestran todas las actividades obtenidas del backend.
-   **Filtrar Actividades:** Se pueden filtrar las actividades mostradas por Fecha, ID de actividad, Cédula del auxiliar y Estado (Todos, En Espera, Aprobado, Rechazado).
-   **Actualizar Estado:** Dentro de la lista (presumiblemente en el componente `ActividadList` o `Card`), se permite cambiar el estado de una actividad (Aprobar/Rechazar), actualizando la información en el backend. _(Nota: La funcionalidad exacta de actualización no está visible en el código `App.tsx` proporcionado, pero se infiere de la descripción)_
-   **Diseño responsive:** Las tecnologias implementadas permiten que el fornt se adapte automaticamente a distintos tamaños de pantalla.

## Trabajos Futuros / Mejoras Pendientes

-   [ ] Implementar pruebas unitarias (ej. con Vitest) para los componentes y lógica de filtrado.
-   [ ] Mejorar el manejo de errores en las llamadas API y mostrar feedback más claro al usuario (ej. toasts de éxito/error).
-   [ ] Añadir paginación o carga infinita si la lista de actividades puede crecer mucho.
-   [ ] Considerar un manejo de estado global (como Zustand o Context API) si la aplicación crece en complejidad.
-   [ ] Dockerizar la aplicacion para realizar una sola ejecución para el front y el back.

## Pruebas de App
-   **Crear Actividades:**
![image](https://github.com/user-attachments/assets/027104b9-af7f-4d11-973b-d68654de73f2)
-   **Listar Actividades:**
![image](https://github.com/user-attachments/assets/95845abc-3f5f-4356-860d-2e8103442522)
-   **Filtrar Actividades:**
![image](https://github.com/user-attachments/assets/73f447c8-1374-4811-995c-71312eb868b9)
-   **Cambiar Status:**
![image](https://github.com/user-attachments/assets/13f6a4e5-963e-4a30-bfde-6417ce7e69cd)

