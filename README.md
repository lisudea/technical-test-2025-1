# technical-test-2025-1
# Conectando una aplicación en Go a un servidor LDAP

## Introducción

En entornos académicos y empresariales, el uso de sistemas centralizados para la gestión de usuarios es una práctica estándar. Uno de los protocolos más comunes para acceder a este tipo de servicios es LDAP (Lightweight Directory Access Protocol). Este protocolo permite autenticar, buscar y gestionar usuarios dentro de un directorio. En este contexto, se planteó la necesidad de desarrollar una aplicación en Go que pueda verificar si un estudiante está registrado en el sistema del Laboratorio Integrado de Sistemas (LIS), utilizando un servidor LDAP. Después de revisar documentación, ejemplos prácticos y experiencias compartidas por otros desarrolladores, pude construir un enfoque sólido para lograrlo.

## Conexión al servidor LDAP desde Go

Para conectar una aplicación en Go a un servidor LDAP, se utiliza comúnmente el paquete `github.com/nmcclain/ldap`. Este paquete permite establecer la conexión, autenticar usuarios y realizar búsquedas dentro del directorio LDAP. La instalación del paquete se realiza mediante:

```bash
go get github.com/nmcclain/ldap
```

Una vez instalado, se puede establecer una conexión al servidor, ya sea en modo estándar o mediante una conexión segura con TLS. Aunque ambas son posibles, la segunda es la recomendada para producción.

### Conexión estándar:

```go
l, err := ldap.Dial("tcp", "localhost:389")
if err != nil {
	log.Fatal(err)
}
defer l.Close()
```

### Conexión segura con TLS:

```go
l, err := ldap.DialTLS("tcp", "ldap.miuniversidad.edu:636", &tls.Config{InsecureSkipVerify: false})
if err != nil {
	log.Fatal(err)
}
defer l.Close()
```

## Autenticación y búsqueda de usuarios

Después de establecer la conexión, el siguiente paso es realizar una autenticación (conocida como "bind") utilizando una cuenta con permisos para consultar el directorio. Posteriormente, se ejecuta una búsqueda para verificar si un usuario existe. Esta operación es esencial para confirmar que el estudiante esté registrado en el sistema.

```go
err = l.Bind("cn=admin,dc=miuniversidad,dc=edu", "miclave")
if err != nil {
	log.Fatal("No se pudo autenticar:", err)
}

searchRequest := ldap.NewSearchRequest(
	"ou=estudiantes,dc=miuniversidad,dc=edu",
	ldap.ScopeWholeSubtree,
	ldap.NeverDerefAliases,
	0, 0, false,
	"(uid=juanperez)",
	[]string{"dn", "cn", "mail"},
	nil,
)
result, err := l.Search(searchRequest)
if err != nil {
	log.Fatal(err)
}

if len(result.Entries) > 0 {
	fmt.Println("Usuario encontrado:", result.Entries[0].DN)
} else {
	fmt.Println("Usuario no registrado")
}
```

## Verificación de credenciales del estudiante

Una vez identificado el DN (Distinguished Name) del usuario, se puede proceder a validar su contraseña. Esto se hace mediante un nuevo "bind" con los datos del usuario. Si la autenticación es exitosa, se confirma que tanto el usuario como sus credenciales son válidos.

```go
err = l.Bind("uid=juanperez,ou=estudiantes,dc=miuniversidad,dc=edu", "clave_estudiante")
if err != nil {
	fmt.Println("Contraseña incorrecta")
} else {
	fmt.Println("Usuario autenticado correctamente")
}
```

## Consideraciones de seguridad

Al trabajar con autenticación de usuarios, la seguridad es prioritaria. Es fundamental implementar buenas prácticas como el uso de conexiones cifradas, la validación de certificados y la protección de credenciales. Algunos puntos clave a tener en cuenta:

1. Utilizar siempre conexiones LDAPS (LDAP sobre SSL/TLS) para proteger la información transmitida.
2. Validar los certificados TLS del servidor para evitar ataques de intermediario (MITM).
3. Evitar guardar contraseñas en texto plano dentro del código. Se recomienda utilizar variables de entorno.
4. Implementar mecanismos de protección contra ataques de fuerza bruta.
5. En caso de almacenar contraseñas, utilizar algoritmos de hashing como bcrypt.

Ejemplo de uso de bcrypt:

```go
hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("miclave"), bcrypt.DefaultCost)
err := bcrypt.CompareHashAndPassword(hashedPassword, []byte("miclave"))
```

## Conclusión

Desarrollar una aplicación en Go que interactúe con un servidor LDAP es un proceso completamente viable y bastante estructurado. Con las herramientas adecuadas, es posible establecer una conexión segura, autenticar usuarios y realizar búsquedas eficaces. Esta solución es especialmente útil para entornos como universidades, donde se requiere controlar el acceso a sistemas mediante credenciales centralizadas.

Este tema sirve reforzar conceptos de seguridad, conocer de cerca cómo funciona LDAP y aplicar prácticas reales de desarrollo en Go. Considero que es una habilidad valiosa para cualquier desarrollador que busque integrarse con infraestructuras ya establecidas y que maneje grandes volúmenes de usuarios.

## Referencias

* [Repositorio de la librería LDAP para Go](https://github.com/nmcclain/ldap)
* [RFC 4511: Lightweight Directory Access Protocol (LDAP)](https://tools.ietf.org/html/rfc4511)
* [bcrypt en Go](https://pkg.go.dev/golang.org/x/crypto/bcrypt)
* [Conceptos básicos de LDAP](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)


