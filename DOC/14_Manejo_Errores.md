# Manejo de Errores

Creamos un archivo llamado `utils/handleError.js`, en el que tendremos una función que se encarga de retornar un error con un mensaje especifico y un código determinado:

```js
const handleHttpError = (res, error = 'Algo sucedió', code = 403) => res.status(code).send({ error })


module.exports = { handleHttpError }
```

Ahora que tenemos esta función, podemos implementarla en cualquier controlador donde necesitemos un manejo de errores, ya sea por parte del cliente o por parte del servidor. Tal es ejemplo la función `getItems` del controlador de `tracks`:

```js
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.find({})
        return res.send({ data })
    } catch (error) {
        handleHttpError(res, `Error en tracks/getItems: ${error}`, 500)
    }
}
```

## `matchedData`

Hay una función de express-validator que nos permite limpiar la data basura que pueda llegar dentro de la request del usuario, y dicho método se llama `matchedData`. Para que funcione, necesitamos pasar los campos del modelo, o los que necesitamos para el servicio, dentro de los arreglos de validación. Esto lo podemos recordar con la lección [Como validar datos en un API REST](10_Validar_Datos_API_REST.md).

Una vez tenemos el arreglo con los campos a validar, podemos ir al controlador respectivo y usar la función `matchedData` de la siguiente manera:

```js
const { matchedData } = require('express-validator')
...
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/createItem', 500)
    }
}
```

Vamos a ver un nuevo ejemplo con la ruta de obtener una pista de canción por su id: Lo primero será crear el arreglo con los campos a validar dentro de `validators/tracks.js`:

```js
const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')
...
const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    validateResults
]

module.exports = {
    ...,
    validatorGetItem
}
```

Luego, creamos el controlador de la ruta en `controllers/tracks.js`:

```js
const { matchedData } = require('express-validator')
const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
...
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await tracksModel.findById(id)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItem', 500)
    }
}
...
module.exports = {
    ...,
    getItem
}
```

Y por último, definimos la ruta dentro de `routes/tracks.js`:

```js
const { ..., getItem } = require('../controllers/tracks')
const { ..., validatorGetItem } = require('../validators/tracks')
...
router.get('/:id', validatorGetItem, getItem)
```

## Actualizar un item

Tenemos un caso un tanto especial, puesto que el controlador de actualización require del id del item, y de la información a actualizar. Lo que haremos será aplicar desestructuración y hacer uso del operador rest (`...`), con el fin de poder obtener la propiedad del id del método `matchedData`, y dejar los demás datos en un objeto aparte (aprovechando que están 'limpios'):

```js
const updateItem = async (req, res) => {
    try {
        const { id, ...rest } = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(id, rest)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/updateItem', 500)
    }
}
```

Para su ruta, empleamos una combinación de los validadores de obtener un item por id, y de crear un item:

```js
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem)
```

___
| Anterior                         |                        | Siguiente                                 |
| -------------------------------- | ---------------------- | ----------------------------------------- |
| [Código de respuesta de encabezado](13_Codigo_Respuesta_Encabezado.md) | [Readme](../README.md) | [Soft Delete eliminación lógica](15_Soft_Delete.md) |
