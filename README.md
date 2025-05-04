# technical-test-2025-1
# Como conectar una app en Go con un servidor LDAP para verificar usuarios

## Introduccion

En el entorno de TI actual, uno de los retos mas comunes es la integracion con servicios ya existentes, como lo son los directorios LDAP. En mi caso, me pidieron investigar como se podria desarrollar una aplicacion en Go que se conecte a un servidor LDAP y verifique si un estudiante esta registrado en el sistema del laboratorio de sistemas (LIS).

Este informe no incluye codigo completamente funcional (aunque si algunos ejemplos), sino que mas bien esta enfocado en explicar el proceso que habria que seguir, que librerias se pueden usar y cuales son las recomendaciones de seguridad que hay que tener en cuenta. La idea es que esta guia pueda servirle a cualquier persona que, como yo, este aprendiendo y quiera entender como funciona todo esto.

## Que es LDAP y para que sirve?

LDAP (Lightweight Directory Access Protocol) es un protocolo que se usa para consultar y modificar servicios de directorio. En palabras simples, se trata de un sistema jerarquico donde se guarda informacion, principalmente sobre usuarios, grupos, dispositivos, etc. Se usa mucho en empresas, universidades y organizaciones para autenticar personas.

Por ejemplo, cuando uno entra a un sistema con su usuario institucional, normalmente en el backend hay un LDAP verificando si ese usuario existe, que permisos tiene, etc.

## Paso 1: Usar Go para conectarse a un servidor LDAP

Go es un lenguaje muy bueno para este tipo de tareas por su rapidez y facilidad de manejo de redes. Lo primero que hice fue buscar librerias que permitieran conectarse a un servidor LDAP, y encontre varias, pero la que mas se usa (y con mejor documentacion) es:

```bash
go get github.com/nmcclain/ldap
```

Esta libreria permite hacer cosas como conectarse al servidor, autenticarse, buscar usuarios y mas.

## Paso 2: Conectarse al servidor LDAP

La conexion se puede hacer de dos formas: usando LDAP normal (sin cifrar) o usando LDAPS, que es la version segura (con SSL/TLS). Obviamente, lo ideal es usar LDAPS para proteger la informacion que se intercambia.

### Conexion basica:

```go
l, err := ldap.Dial("tcp", "ldap://localhost:389")
if err != nil {
	log.Fatal("No se pudo conectar al servidor:", err)
}
defer l.Close()
```

Si estas usando LDAPS, seria algo como:

```go
l, err := ldap.Dial("tcp", "ldaps://localhost:636")
```

## Paso 3: Autenticarse (Bind)

Despues de conectarte, toca autenticarse. Esto se hace con una funcion llamada `Bind`, donde uno le pasa un usuario (normalmente el admin LDAP) y una contrasena. El usuario se identifica con algo llamado DN (Distinguished Name), que es como la "ruta" unica dentro del directorio LDAP.

```go
err = l.Bind("cn=admin,dc=example,dc=com", "contrasena")
if err != nil {
	log.Fatal("Error al autenticarse:", err)
}
```

## Paso 4: Buscar y verificar usuarios

Una vez conectados y autenticados, ya podemos buscar usuarios dentro del sistema. Para eso se hace una busqueda con filtros.

```go
searchRequest := ldap.NewSearchRequest(
	"ou=students,dc=example,dc=com",
	ldap.ScopeWholeSubtree,
	ldap.NeverDerefAliases,
	0, 0, false,
	"(uid=jdoe)",
	[]string{"dn", "cn", "mail"},
	nil,
)
```

Luego revisamos si hubo resultados:

```go
if len(result.Entries) > 0 {
	fmt.Println("Usuario encontrado:", result.Entries[0].DN)
} else {
	fmt.Println("Usuario no encontrado.")
}
```

## Paso 5: Verificar la contrasena del estudiante

Si ademas de saber si esta registrado, queremos saber si la contrasena es correcta, hay que hacer un nuevo `Bind`:

```go
err = l.Bind("uid=jdoe,ou=students,dc=example,dc=com", "contrasena_del_usuario")
if err != nil {
	fmt.Println("Contrasena incorrecta")
} else {
	fmt.Println("Autenticacion exitosa")
}
```

## Seguridad: Como proteger todo esto?

### 1. Usar LDAPS

Siempre que se pueda, usa `ldaps://` para que los datos vayan cifrados.

### 2. Validar certificados

Es fundamental validar los certificados SSL para evitar ataques de tipo MITM.

### 3. Guardar bien las contrasenas

Nunca se deben poner directamente en el codigo. Mejor usar variables de entorno.

### 4. Evitar fuerza bruta

Limitar intentos y loguear actividad sospechosa.

### 5. Hash de contrasenas

Si algun dia se guardan contrasenas, usar bcrypt:

```go
hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("miContrasena"), bcrypt.DefaultCost)
```

Y para verificar:

```go
err := bcrypt.CompareHashAndPassword(hashedPassword, []byte("miContrasena"))
```

## Conclusion

Conectar una app en Go con un servidor LDAP no es tan dificil, pero si requiere cuidado en la parte de seguridad. Lo mas importante es conectarse de forma segura, autenticar correctamente, buscar con filtros precisos y proteger los datos en todo momento.

## Referencias

* [https://github.com/nmcclain/ldap](https://github.com/nmcclain/ldap)
* [https://tools.ietf.org/html/rfc4511](https://tools.ietf.org/html/rfc4511)
* [https://pkg.go.dev/golang.org/x/crypto/bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)
* [https://en.wikipedia.org/wiki/Lightweight\_Directory\_Access\_Protocol#LDAPS](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol#LDAPS)

