# Sistema de Gestión de Actividades

Este proyecto es una aplicación web desarrollada con React y Vite para la gestión de actividades, permitiendo el registro y seguimiento de actividades con diferentes estados.

## Características

- Registro de nuevas actividades
- Visualización de actividades existentes
- Filtrado de actividades por fecha y auxiliar
- Gestión de estados de actividades (en espera, aprobado, rechazado)
- Interfaz de usuario intuitiva y responsiva

## Tecnologías Utilizadas

- React
- Vite
- Axios para peticiones HTTP
- React Router para navegación
- Bootstrap para estilos

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` basado en `.env.example`
   - Configurar la URL de la API backend

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── api/           # Servicios y configuración de API
├── components/    # Componentes reutilizables
├── pages/         # Páginas principales
├── App.jsx        # Componente principal
└── main.jsx       # Punto de entrada
```

## API Endpoints

- GET `/actividades` - Obtener todas las actividades
- POST `/actividades` - Crear una nueva actividad
- GET `/actividades/assistant/{documento}` - Obtener actividades por auxiliar
- PATCH `/actividades/{id}` - Actualizar estado de una actividad
