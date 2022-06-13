# Como validar datos en un API REST

Vamos a instalar un paquete llamado express-validator, para ello usamos el siguiente comando:

```txt
npm i express-validator -S
```

La idea será validar la petición que se hace para crear un nuevo item para las pistas de canciones. Para ello, creamos un directorio llamado `validators`, y dentro un archivo llamado `tracks.js` en el que tendremos un arreglo con validaciones ya establecidas por `express-validator`. Como último elemento de cada arreglo, vamos a añadir una función especial que explicaremos más adelante:

```js
const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("artist.nickname").exists().notEmpty(),
    check("artist.nationality").exists().notEmpty(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty(),
    check("duration.end").exists().notEmpty(),
    check("mediaId").exists().notEmpty().isMongoId(),
    validateResults
]

module.exports = {
    validatorCreateItem
}
```

Creamos un archivo llamado `utils/handleValidator.js`, en el que tendremos una función que se encarga de revisar los resultados de los validadores anteriores al llamado de esta función. Si no encuentra ningún error, sigue con el llamado al controlador, pero en caso de que halla error, se lo informamos al usuario:

```js
const { validationResult } = require('express-validator')

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        return res.status(403).send({ errors: error.array() })
    }
}

module.exports = validateResults
```

En el archivo `routes/tracks.js` hacemos uso del arreglo con las validaciones, en la posición de middleware dentro de la ruta de creación de item:

```js
...
const { validatorCreateItem } = require('../validators/tracks')
...
router.post('/', validatorCreateItem, createItem)
...
```

___
| Anterior                                   |                        | Siguiente                                 |
| ------------------------------------------ | ---------------------- | ----------------------------------------- |
| [POSTMAN API Node](09_POSTMAN_API_Node.md) | [Readme](../README.md) | [Como subir un mp3](11_Como_Subir_mp3.md) |
