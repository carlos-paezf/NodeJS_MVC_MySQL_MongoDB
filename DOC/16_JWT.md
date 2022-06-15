# JWT (Json Web Token)

Un JWT es método estándar que representa las peticiones de seguridad entre 2 partes. Es básicamente una cadena de texto encriptado que consta de un Header, un Payload y una Verify Signature. Como es encriptado de doble vía, es importante no poner datos sensibles dentro del Payload, puesto que cualquier persona puede ver el contenido desencriptado. La ventaja está en que al momento de modificar el token, la firma cambia y esto hace que sea un token invalido.

Vamos a instalar 2 paquetes con el siguiente comando:

```js
npm i jsonwebtoken bcryptjs -S
```

Ahora vamos a crear un archivo de rutas para la autenticación, llamado `routes/auth.js`, otro para los validadores llamado `validators/auth.js` y un último para los controladores `controllers/auth.js`. En las validación tendremos la siguiente configuración:

```js
const { check } = require('express-validator')
const validateResults = require('/utils/handleValidator')

const validatorRegister = [
    check('name').exists().notEmpty().isLength({ min: 3, max: 50 }),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail(),
    validateResults
]

const validatorLogin = [
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail(),
    validateResults
]

module.exports = { validatorRegister, validatorLogin }
```

Nuestro archivo de rutas tendrá la siguiente información:

```js
const { Router } = require('express')
const { register, login } = require('../controllers/auth')
const { validatorLogin, validatorRegister } = require('../validators/auth')

const router = Router()

router.post('/register', validatorRegister, register)
router.post('/login', validatorLogin, login)

module.exports = router
```

Antes de pasar a los controladores, vamos a crear un archivo llamado `utils/handlePassword.js`, en donde vamos a tener las funciones de encriptar y comparar las contraseñas. Dichos métodos los usaremos en el controladores respectivos:

```js
const bcrypt = require('bcryptjs')


const encrypt = async (passwordPlain) => await bcrypt.hash(passwordPlain, 10)

const compare = async (passwordPlain, hashPassword) => await bcrypt.compare(passwordPlain, hashPassword)


module.exports = { encrypt, compare }
```

Dentro del modelo de usuarios, hacemos un pequeño cambio para ocultar el campo de las contraseñas cuando se hace uso de sentencias tipo `SELECT`:

```js
...
const UserSchema = new Schema(
    {
        ...,
        password: { 
            type: String,
            select: false 
        },
        ...
    },
    { ... }
)
...
```

Y por último en los controladores nos vamos a encargar de encriptar y desencriptar las contraseñas (además de la lógica de registro e ingreso). Por el momento vamos a explicar el método de registrar un usuario: Primero desestructuramos la contraseña de la petición del usuario, luego creamos el documento en la base de datos, pero encriptando la contraseña, y por último asignamos un undefined a la contraseña de la data retornada por la base de datos, para que no se muestre en el retorno de la respuesta:

```js
const { matchedData } = require('express-validator')
const { encrypt } = require('../utils/handlePassword')
const { usersModel } = require('../models')


const register = async (req, res) => {
    const { password, ...rest } = matchedData(req)

    const data = await usersModel.create({
        ...rest,
        password: await encrypt(password)
    })
    data.set('password', undefined, { strict: false })
    return res.send({ data })
}
```

___
| Anterior                                  |                        | Siguiente |
| ----------------------------------------- | ---------------------- | --------- |
| [Soft Delete eliminación lógica](15_Soft_Delete.md) | [Readme](../README.md) | [Generar JWT en Node](17_Generar_JWT_Node.md) |
