# Proteger rutas con roles

## Proteger la rutas con JWT

Lo primero que vamos a ver, es como proteger una ruta para que solo puedan acceder a ella si cuentan con el token de inicio de sesión. Para ello creamos un archivo llamado `middlewares/session.js` en el que tendremos un middleware que se encarga de obtener el token que se envía en el header de la petición, para luego separarlo de la palabra `Bearer`, y aplicar la verificación del jwt:

```js
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return handleHttpError(res, 'Not Token', 401) 

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken._id) return handleHttpError(res, 'Error id token', 401)

        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Not Session', 401)
    }
}


module.exports = authMiddleware
```

Luego podemos ir a las rutas de las pistas de canciones y aplicamos nuestro middleware:

```js
const authMiddleware = require('../middlewares/session')
...
router.get('/', authMiddleware, getItems)
...
```

Ahora bien, si queremos saber cual usuario es el que está accediendo a nuestro endpoint, podemos hacer una consulta a la colección de usuarios mediante el id que está registrado en el JWT, para luego enviar los datos mediante la propiedad `user` de la petición:

```js
const authMiddleware = async (req, res, next) => {
    try {
        ...
        req.user = await usersModel.findById(dataToken._id)

        next()
    } catch (error) { ... }
}
```

Luego, desde el controlador de la ruta, podemos traer los datos del usuario con el fin de poder llevar un historial de las acciones del usuario dentro de nuestro servidor:

```js
const getItems = async (req, res) => {
    try {
        const { user } = req
        ...
        return res.send({ data, user })
    } catch (error) { ... }
}
```

## Proteger las rutas mediante los roles

Ahora vamos a crear un nuevo middleware dentro del archivo `middlewares/rol.js` que se va a encargar de validar el rol del usuario que está haciendo la petición:

```js
const { handleHttpError } = require("../utils/handleError")

const checkRol = (...roles) => (req, res, next) => {
    try {
        const { user } = req
        const rolesByUser = user.role

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if (!checkValueRol) return handleHttpError(res, 'User not permissions', 401)

        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en checkRol', 500)
    }
}

module.exports = checkRol
```

Dentro de las rutas, en las cuales llamemos el anterior método, debemos si o si haber llamado antes el middleware `authMiddleware`, puesto que del JWT es de donde estamos trayendo los datos del usuario para enviarlos a la propiedad `req.user`. Por ejemplo, para la ruta de eliminación de canciones queremos que solo los administradores tengan el permiso de eliminar el documento, mientras que en la ruta de subir una canción, lo puede hacer el usuario y el admin:

```js
const checkRol = require('../middlewares/rol')
...
router.post(
    '/',
    [authMiddleware, checkRol('admin', 'user'), validatorCreateItem],
    createItem
)
...
router.delete(
    '/:id',
    [authMiddleware, checkRol('admin'), validatorGetItem],
    deleteItem
)
```

___
| Anterior                |                        | Siguiente                                                  |
| ----------------------- | ---------------------- | ---------------------------------------------------------- |
| [Login](18_Login.md.md) | [Readme](../README.md) | [Trazabilidad de Errores de Backend con Slack](20_Trazabilidad_errores_Slack.md) |
