# Prueba LIS - Sistema de Gestión de Laboratorio

Este proyecto es un sistema de gestión de laboratorio desarrollado con Spring Boot y PostgreSQL.

## 🚀 Tecnologías Utilizadas

- Java 17
- Spring Boot 3.4.5
- Spring Data JPA
- PostgreSQL
- MapStruct
- Gradle
- Spring Validation

## 📁 Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── prueba/
│   │           └── lis/
│   │               ├── controller/    # Controladores REST
│   │               ├── service/       # Lógica de negocio
│   │               ├── repository/    # Repositorios JPA
│   │               ├── entity/        # Entidades JPA
│   │               ├── dto/           # Objetos de Transferencia de Datos
│   │               ├── mapper/        # Mapeadores MapStruct
│   │               └── utils/         # Utilidades
│   └── resources/
│       └── application.properties     # Configuración de la aplicación
└── test/                             # Pruebas unitarias y de integración
```

## 🔧 Requisitos Previos

- Java 17 o superior
- PostgreSQL
- Gradle

## 🛠️ Instalación y Configuración

1. Configurar la base de datos:
   - Crear una base de datos PostgreSQL llamada `actividades-lis`
   - Ejecutar el script de creación de tablas (llamado schema.sql)

2. Configurar las variables de entorno en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/actividades-lis
spring.datasource.username=postgres
spring.datasource.password=utopia
```

3. Instalar dependencias:
```bash
./gradlew build
```

## 🚀 Ejecución del Proyecto

Para ejecutar el proyecto en modo desarrollo:

```bash
./gradlew bootRun
```

El servidor estará disponible en `http://localhost:8080/backend-lis/api`

## 📚 Endpoints Disponibles

### Actividades

#### Crear una nueva actividad
```http
POST /activities
Content-Type: application/json

{
    "assistName": "Juan Pérez",
    "assistId": 123,
    "dateInit": "2024-05-06T08:00:00",
    "dateEnd": "2024-05-06T12:00:00",
    "description": "Análisis de muestras de sangre",
    "estado": "en espera"
}
```

#### Actualizar campos específicos de una actividad
```http
PATCH /activities/{id}
Content-Type: application/json

{
    "estado": "aprobado",
    "description": "Análisis de muestras de sangre - Actualizado"
}
```

#### Eliminar una actividad
```http
DELETE /activities
Content-Type: application/json

{
    "id": 1,
    "assistName": "Juan Pérez",
    "assistId": 123,
    "dateInit": "2024-05-06T08:00:00",
    "dateEnd": "2024-05-06T12:00:00",
    "description": "Análisis de muestras de sangre",
    "estado": "en espera"
}
```

### Filtros y Consultas

#### Obtener actividades por rango de fechas
```http
GET /activities/fecha?startDate=2024-05-01T00:00:00&endDate=2024-05-31T23:59:59
```

#### Contar actividades en una fecha específica
```http
GET /activities/count/date?date=2024-05-06
```

#### Calcular horas trabajadas por auxiliar
```http
GET /activities/hours/assistant/123?date=2024-05-06
```

## 🧪 Pruebas

Para ejecutar las pruebas:

```bash
./gradlew test
```

## 📝 Notas Adicionales

- El proyecto utiliza MapStruct para el mapeo entre entidades y DTOs
- Se implementa validación de datos con Spring Validation
- La base de datos se gestiona con JPA y PostgreSQL
- El contexto de la aplicación está configurado en `/backend-lis/api`
- Se ha configurado CORS para permitir conexiones desde `http://localhost:5173`


