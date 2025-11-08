# Login Test - Servidor

Este proyecto contiene la API rest que debe estar alojada en el servidor.

Está desarrollada en PHP y se trata de una API muy básica que permite el login y el registro de usuarios.

La base de datos de prueba está alojada en mi servidor personal en [pepebelmonte.es](http://www.pepebelmonte.es)

## Modelo UML (local)
```
|---------------------|
|       User          |
|---------------------|
| - id: Long          |
| - username: String  |
| - email: String     |
| - active: Boolean   |
| - name: String      |
| - surname: String?  |
| - password: String  |
| - token: String?    |
|---------------------|
| +login(username,    |
|  password): GET     |
| +create(): POST     |
+---------------------+
```

## Modelo UML (SWapi)
```
+----------------------------------+
|     Starship                     |
+----------------------------------+
| - name: String                   |
| - model: String                  |
| - manufacturer: String           |
| - cost_in_credits: String        |
| - length: String                 |
| - max_atmosphering_speed: String |
| - crew: String                   |
| - passengers: String             |
| - cargo_capacity: String         |
| - consumables: String            |
| - hyperdrive_rating: String      |
| - MGLT: String                   |
| - starship_class: String         |
| - created: DateTime              |
| - edited: DateTime               |
| - url: URL                       |
+----------------------------------+
|                                  |
+----------------------------------+
| * pilots: Person[]               |
| * films: Film[]                  |
+----------------------------------+

+----------------------+
|      Person          |
+----------------------+
| - url: URL           |
+----------------------+

+----------------------+
|       Film           |
+----------------------+
| - url: URL           |
+----------------------+
```


## Creación de la tabla (local)

Estructura de tabla para la tabla `users` (no se permite duplicidad por username)

```
CREATE TABLE `users` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`email` VARCHAR(120) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`active` TINYINT(1) NOT NULL DEFAULT '1',
	`name` VARCHAR(60) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`surname` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`password` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`token` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `username` (`username`)
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

```

## Inserción de datos de prueba en la tabla

Volcado de datos para la tabla `users`.

La contraseña está codificada en `base64`, para hacer login el usuario y la contraseña deben ser `pepe` en ambos campos.

```
INSERT INTO `users` (`id`, `username`, `email`, `active`, `name`, `surname`, `password`, `token`) VALUES
(1, 'pepe', 'test@pepebelmonte.es', 1, 'Pepe', 'Belmonte', 'cGVwZQ==', '');
```

## URLs de prueba
### Login

Recuperar usuario 
```
GET a la url http://www.pepebelmonte.es/api/user/?username=pepe&password=pepe
```

Devuelve el registro del usuario. El token es simulado, devuelve los datos del usuario codificados en base64
```
{
  "username": "pepe",
  "email": "test@pepebelmonte.es",
  "name": "José Antonio",
  "surname": "Belmonte",
  "token": "eyJ1c2VybmFtZSI6InBlcGUiLCJlbWFpbCI6InBlcGVAcGVwZWJlbG1vbnRlLmVzIiwibmFtZSI6Ikpvc1x1MDBlOSBBbnRvbmlvIiwic3VybmFtZSI6IkJlbG1vbnRlIn0="
}
```


### Creación de usuario (registro)


```
POST a la url http://www.pepebelmonte.es/api/user/

```

Payload de ejemplo
```
{
  "username": "paco",
  "email": "test@pepebelmonte.es",
  "name" : "José Antonio",
  "surname": "Belmonte",
  "password": "12345"
}
```