# Generar JWT

Dentro de las variables de entorno, almacenamos una llave secreta para el JWT:

```.env
...
JWT_SECRET = 'secret'
```

Creamos un archivo llamado `utils/handleJwt.js` para las funciones relacionadas con el JWT (firma del token, y verificación del mismo):

```js
const { sign, verify } = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET


const tokenSign = (user) => sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "2h" })

const verifyToken = async (token) => {
    try {
        return verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }
```

Vamos al controlador de registro en `controllers/auth.js` y añadimos el token a la respuesta:

```js
...
const { tokenSign } = require('../utils/handleJwt')

const register = async (req, res) => {
    ...
    const data = {
        token: tokenSign(user),
        user
    }
    return res.send({ data })
}
```

___
| Anterior                          |                        | Siguiente            |
| --------------------------------- | ---------------------- | -------------------- |
| [JWT (Json Web Token)](16_JWT.md) | [Readme](../README.md) | [Login](18_Login.md) |
