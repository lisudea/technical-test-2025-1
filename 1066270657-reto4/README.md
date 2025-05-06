# Informe Investigativo: Conexión y Verificación de Usuarios LDAP desde Go

## Introducción

LDAP (Lightweight Directory Access Protocol) es un estándar ampliamente utilizado para la autenticación y gestión de usuarios. Integrarlo en aplicaciones desarrolladas en Go permite aprovechar sistemas existentes de control de acceso. Este informe explica cómo conectar una aplicación Go a un servidor LDAP para verificar usuarios, incluyendo aspectos clave de conexión, autenticación y seguridad.

## 1. Conexión al LDAP: Cómo establecer una conexión con un servidor LDAP desde Go

Para establecer una conexión con un servidor LDAP desde una aplicación Go, es necesario utilizar una biblioteca que implemente el protocolo LDAP. La biblioteca `github.com/go-ldap/ldap` es una opción popular y robusta para este propósito.

El proceso de conexión generalmente implica los siguientes pasos:

### Importar la biblioteca
En el archivo Go donde se realizará la conexión, se debe importar el paquete ldap:

```go
import "github.com/go-ldap/ldap"
```

### Establecer la conexión
La función `ldap.Dial` se utiliza para iniciar una conexión TCP al servidor LDAP. Requiere la dirección de red del servidor (host:puerto). Es crucial manejar posibles errores durante este proceso.

```go
conn, err := ldap.Dial("tcp", "ldap.ejemplo.com:389")
if err != nil {
    log.Fatalf("Error al conectar al servidor LDAP: %v", err)
}
defer conn.Close() // Asegurar el cierre de la conexión al finalizar
```

### Autenticación Inicial (Bind)
Una vez establecida la conexión, es común realizar una operación de "bind" para autenticar la aplicación con el servidor LDAP. Esto se realiza proporcionando un nombre de usuario (DN - Distinguished Name) y una contraseña con los permisos necesarios para realizar las operaciones deseadas (como la búsqueda de usuarios). Estos datos a menudo se configuran mediante variables de entorno para mayor seguridad y flexibilidad.

```go
err = conn.Bind(os.Getenv("BIND_USER"), os.Getenv("BIND_PASSWORD"))
if err != nil {
    log.Fatalf("Error al realizar el bind con el servidor LDAP: %v", err)
}
```

Es importante destacar que la cuenta utilizada para el bind debe tener los permisos adecuados para buscar información de usuarios en el directorio LDAP.

## 2. Verificación de Usuarios: Cómo buscar y verificar usuarios en LDAP

La verificación de usuarios en LDAP generalmente involucra los siguientes pasos:

### Construcción de la búsqueda
Se crea una solicitud de búsqueda (`ldap.NewSearchRequest`) especificando los siguientes parámetros:

- **Base DN (Distinguished Name)**: El punto de partida en la jerarquía del directorio LDAP donde se iniciará la búsqueda de usuarios. Este valor suele configurarse mediante una variable de entorno (`LDAP_BASE_DN`).
- **Scope**: Define la extensión de la búsqueda dentro del directorio (e.g., `ldap.ScopeWholeSubtree` para buscar en todo el subárbol).
- **Deref Aliases**: Especifica cómo se deben manejar los alias (referencias a otros objetos).
- **Size Limit y Time Limit**: Restricciones opcionales para limitar el número de resultados y la duración de la búsqueda.
- **Only Attributes**: Indica si se deben devolver solo los nombres de los atributos.
- **Filter**: Una cadena que define los criterios de búsqueda. Para la autenticación, un filtro común es buscar por el atributo de nombre de usuario (por ejemplo, `(sAMAccountName=%s)` en Active Directory o `(uid=%s)` en otros servidores LDAP), donde `%s` se reemplaza por el nombre de usuario proporcionado por el usuario.
- **Attributes**: Una lista de los atributos que se desean recuperar de las entradas encontradas (generalmente, el DN del usuario es suficiente para la autenticación).
- **Controls**: Extensiones opcionales para la búsqueda.

```go
searchRequest := ldap.NewSearchRequest(
    os.Getenv("LDAP_BASE_DN"),
    ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
    fmt.Sprintf("(sAMAccountName=%s)", user.Username), // Ejemplo para Active Directory
    []string{"dn"},
    nil,
)
```

### Ejecución de la búsqueda
Se utiliza el método `conn.Search` para enviar la solicitud al servidor LDAP.

```go
searchResult, err := conn.Search(searchRequest)
if err != nil {
    log.Errorf("Error durante la búsqueda LDAP: %v", err)
    return false, err
}
```

### Verificación de resultados
Se analiza el resultado de la búsqueda. Para una autenticación exitosa, generalmente se espera encontrar una única entrada de usuario que coincida con el nombre de usuario proporcionado. Si no se encuentra ninguna entrada o se encuentran múltiples, la autenticación debe fallar.

```go
if len(searchResult.Entries) != 1 {
    log.Errorf("Usuario '%s' no encontrado o múltiples entradas encontradas", user.Username)
    return false, fmt.Errorf("usuario '%s' no encontrado o múltiples entradas encontradas", user.Username)
}
```

### Autenticación del usuario
Una vez que se ha encontrado la entrada del usuario, se intenta realizar una operación de "bind" utilizando el DN de la entrada encontrada y la contraseña proporcionada por el usuario. Si esta operación tiene éxito, significa que las credenciales son correctas.

```go
userDN := searchResult.Entries[0].DN
err = conn.Bind(userDN, user.Password)
if err != nil {
    log.Errorf("Error de autenticación LDAP para el usuario '%s': %v", user.Username, err)
    return false, fmt.Errorf("autenticación fallida para el usuario '%s'", user.Username)
}
return true, nil
```

## 3. Seguridad: Consideraciones para asegurar la conexión y proteger los datos

La seguridad es una preocupación primordial al interactuar con servidores LDAP, especialmente cuando se manejan credenciales de usuario. A continuación, se presentan algunas consideraciones importantes:

### Conexiones Seguras (LDAPS)
Siempre que sea posible, se debe utilizar LDAPS (LDAP sobre SSL/TLS) en lugar de LDAP sin cifrar. LDAPS cifra toda la comunicación entre la aplicación Go y el servidor LDAP, protegiendo la confidencialidad de las credenciales y otros datos sensibles transmitidos. Para utilizar LDAPS con la biblioteca go-ldap, se debe usar la función `ldap.DialTLS` en lugar de `ldap.Dial`. Se pueden configurar opciones TLS personalizadas si es necesario.

```go
tlsConfig := &tls.Config{InsecureSkipVerify: true} // Considerar configurar certificados apropiadamente en producción
conn, err := ldap.DialTLS("tcp", "ldap.ejemplo.com:636", tlsConfig)
if err != nil {
    log.Fatalf("Error al conectar al servidor LDAPS: %v", err)
}
defer conn.Close()
```

Es crucial configurar correctamente los certificados TLS para evitar ataques de "man-in-the-middle". La opción `InsecureSkipVerify: true` debe evitarse en entornos de producción, y en su lugar, se deben configurar los certificados de CA del servidor LDAP.

### Almacenamiento Seguro de Credenciales
Las credenciales utilizadas para el bind inicial de la aplicación al servidor LDAP (el `BIND_USER` y `BIND_PASSWORD`) deben almacenarse de forma segura, preferiblemente utilizando mecanismos como variables de entorno gestionadas por el sistema operativo o un servicio de gestión de secretos. Evitar incluir estas credenciales directamente en el código fuente.

### Validación de Entradas
Al construir los filtros de búsqueda LDAP con datos proporcionados por el usuario (como el nombre de usuario), es importante realizar una validación adecuada para prevenir posibles ataques de inyección LDAP. Si bien la biblioteca go-ldap ayuda a prevenir ciertas inyecciones al escapar los valores, es una buena práctica general validar y sanear las entradas del usuario.

### Limitación de Permisos
La cuenta utilizada para el bind inicial debe tener los permisos mínimos necesarios para realizar las operaciones requeridas (principalmente la búsqueda de usuarios). Evitar el uso de cuentas con privilegios administrativos para esta conexión.

### Manejo de Errores
Implementar un manejo de errores robusto para registrar y responder adecuadamente a los fallos de conexión, búsqueda o autenticación, sin revelar información sensible sobre la infraestructura LDAP.

### Registro y Auditoría
Mantener registros detallados de los intentos de autenticación (tanto exitosos como fallidos) puede ser crucial para la seguridad y el diagnóstico de problemas.

## Conclusión

Integrar LDAP en aplicaciones Go permite un control de acceso centralizado y seguro. Utilizando bibliotecas como go-ldap, es posible autenticar usuarios de forma eficiente. Para garantizar la seguridad, se recomienda usar conexiones LDAPS, manejar credenciales con cuidado y validar las entradas del usuario. 