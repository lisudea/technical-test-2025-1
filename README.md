# API de Gestión de Actividades - Registro y Control

## Desarrollador: Jhomar Arrieta - Prueba Tecnica LIS

---

**Nota:** Este es un proyecto backend desarrollado para gestionar el registro y control de actividades realizadas por los auxiliares, permitiendo su creación, listado, filtrado y actualización de estado.

## Resumen del proyecto

Esta API RESTful proporciona las funcionalidades necesarias para administrar un sistema de registro de actividades. Permite a los usuarios crear nuevas actividades, listar las actividades existentes (con opciones de filtrado por fecha, ID, cédula y estado), y actualizar el estado de cada actividad (aprobar o rechazar).

## Arquitectura
La arquitectura del proyecto sigue el patrón Modelo-Vista-Controlador (MVC), permitiendo una separación clara de responsabilidades y facilitando la escalabilidad y mantenimiento del código. A continuación, se describe la estructura y función de cada uno de los componentes principales del sistema:

1. **Modelo (Model)**:
   - Los modelos representan las entidades principales del sistema, tales como **Actividad**, que contiene los atributos y comportamientos necesarios para manipular las actividades registradas.
   - En el caso de la entidad **Actividad**, se usa una clase Java anotada con `@Entity` de **JPA** para la persistencia en la base de datos. Esta clase define los campos, los cuales incluyen atributos como `id`, `cedulaAuxiliar`, `descripcion`, `estado`, `inicio` y `fin`.

2. **Vista (View)**:
   - La vista se encuentra separada, dado que el proyecto es una **API REST**. Se encuentra en la rama "1068136291-reto3" de este mismo repositorio, los controladores responden con datos en formato JSON a las solicitudes HTTP, proporcionando la "vista" de los datos en un formato estructurado para su consumo por la aplicacion Fronend implementada en React.

3. **Controlador (Controller)**:
   - Los controladores gestionan las solicitudes HTTP entrantes y coordinan la interacción con el modelo y el servicio. Cada controlador tiene métodos anotados con `@GetMapping`, `@PostMapping` y `@PutMapping` para manejar las operaciones CRUD de las actividades.
   - Los endpoints están bien definidos para realizar acciones como crear, obtener, y actualizar el status de las actividades, con validaciones de parámetros y respuestas adecuadas.

4. **Servicio (Service)**:
   - La capa de servicio contiene la lógica de negocio del sistema. Los servicios gestionan la manipulación y transformación de los datos, comunicándose con el repositorio para acceder a la base de datos y realizar las operaciones solicitadas por los controladores.
   - El servicio de **ActividadService** es responsable de las operaciones relacionadas con las actividades, como la creación, actualización y eliminación de las mismas, utilizando los métodos proporcionados por el repositorio.

5. **Repositorio (Repository)**:
   - La capa de repositorio se encarga de la interacción con la base de datos. Utilizando **Spring Data JPA**, se han definido interfaces de repositorio que extienden de `JpaRepository` para facilitar las operaciones de persistencia sin necesidad de implementar métodos personalizados.
   - El repositorio **ActividadRepository** maneja las consultas y operaciones CRUD de la entidad **Actividad**, como guardar, actualizar y buscar actividades.

6. **Configuración (Config)**:
   - Contiene la configuración de la aplicación, como la política de CORS (Cross-Origin Resource Sharing) para permitir peticiones desde dominios específicos.

### Resumen:
Esta arquitectura facilita la gestión de las funcionalidades del sistema a través de una clara separación de responsabilidades entre las diferentes capas. La capa **Controller** se encarga de gestionar las solicitudes HTTP, mientras que la capa **Service** contiene la lógica de negocio y la capa **Repository** maneja la persistencia de datos. La capa **Config** contiene la configuración del CORS para que se pueda conectar el back con el dominio del front



## Objetivos del Proyecto ✨

Desarrollar una API REST que permita la gestión eficiente y el control del registro de actividades.

Los objetivos específicos de la API incluyen:

✅ Permitir la creación de nuevas actividades con detalles como nombre del auxiliar, cédula, descripción, fecha y hora de inicio y fin.

✅ Listar todas las actividades registradas.

✅ Filtrar las actividades por fecha de inicio, ID, cédula del auxiliar y estado (en espera, aprobado, rechazado).

✅ Actualizar el estado de una actividad a "aprobado" o "rechazado".

✅ Exponer endpoints REST con una estructura clara y siguiendo buenas prácticas de diseño de API.

## Consideraciones en el Análisis y Diseño del Proyecto

Durante el diseño de este proyecto, se tuvieron en cuenta las siguientes consideraciones clave:

* **Validación de Datos:** Se espera que los datos enviados en las peticiones (especialmente en la creación de actividades) sean válidos y cumplan con los requisitos definidos.
* **Manejo de Estados:** El sistema gestiona el estado de las actividades, permitiendo su seguimiento y control a través de las opciones de "en espera", "aprobado" y "rechazado".
* **Filtrado Flexible:** La API ofrece múltiples opciones de filtrado para facilitar la búsqueda y gestión de las actividades según diferentes criterios.
* **Integridad de los Datos:** Se busca mantener la integridad de los datos almacenados en la base de datos.

## Requisitos del Entorno Local ⚙️

Para ejecutar este backend en tu entorno local, asegúrate de tener instalado lo siguiente:

* **Java Development Kit (JDK):** Versión **21**. Puedes descargarlo desde https://www.oracle.com/java/technologies/downloads/.
* **MySQL:** Versión **8.0.42**. Puedes instalarlo desde https://www.mysql.com/downloads/.
* **Maven:** Versión **4.0.0**. Maven se utiliza para la gestión de dependencias y la construcción del proyecto. 
* **IDE (Opcional):** Un entorno de desarrollo integrado como IntelliJ IDEA, y para gestionar las tablas en MySQL WorkBench.

## Configuración de la Base de Datos MySQL 🛠️

Sigue estos pasos para configurar la base de datos MySQL necesaria para este proyecto:

1.  **Instala MySQL:** Si aún no lo has hecho, instala MySQL en tu sistema utilizando el enlace proporcionado en la sección de requisitos.
2.  **Accede al Shell de MySQL:** Abre la terminal o el símbolo del sistema y accede al shell de MySQL utilizando el cliente `mysql`. Es posible que necesites proporcionar tu nombre de usuario y contraseña de MySQL (En este caso para notener inconvenientes con el proyecto utiliza el usuario: root y la contraseña: Arya2004*, o si lo deseas cambia estas propiedades desde la clase application.properties del proyecto):
    ```bash
    mysql -u root -p
    ```
3.  **Crea la Base de Datos:** Ejecuta el siguiente comando para crear una nueva base de datos para tu proyecto:
    ```sql
    CREATE DATABASE actividad;
    ```
    
4.  **Ejecutar el programa:** Al ejectura el programa las tablas se generarn automaticamente en la base de datos ten en cuenta que las propiedades de esta coincidan con las del proyecto.


    **Importante:** Revisa tu clase de entidad `Actividad` en el backend y asegúrate de que los nombres de las columnas y los tipos de datos en la tabla MySQL coincidan. Por ejemplo, si tu propiedad en Java es `nombreAuxiliar`, en la base de datos debería ser `nombre_auxiliar` (siguiendo convenciones de nombres de base de datos). Ajusta los tipos de datos (VARCHAR, TEXT, DATETIME, etc.) según corresponda a tus propiedades en Java.


## Configuración de la Aplicación Backend ⚙️

La configuración de la aplicación backend se realiza a través del archivo `application.properties` ubicado en la carpeta `src/main/resources`. Asegúrate de que las siguientes propiedades coincidan con la configuración de tu base de datos MySQL
