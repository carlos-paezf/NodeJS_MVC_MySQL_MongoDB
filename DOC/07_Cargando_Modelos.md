# Cargando Modelos

Creamos un nuevo archivo llamado `models/index.js`, en el que tendremos un objeto con los modelos para exportar. Luego haremos un cambio para que se puedan cargar de manera dinámica dependiendo del tipo de base de datos:

```js
const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storagesModel: require('./nosql/storage'),
}

module.exports = models
```

## Uso del Modelo dentro de un Controlador

Dentro del archivo controlador, importamos el modelo que necesitamos, y dentro del método del controlador podemos usar el modelo con las funciones que pueden ofrecer el ODM o el ORM. Por ejemplo, para el caso de las pistas queremos obtener todos los elementos que se encuentren guardados. Dentro del archivo `controllers/tracks.js` hacemos lo siguiente:

```js
const { tracksModel } = require('../models')

const getItems = async (req, res) => {
    const data = await tracksModel.find({})
    return res.send({ data })
}
```

Veamos el ejemplo de como se puede implementar el envió de información. Lo primero será definir la ruta dentro de `routes/tracks.js`:

```js
...
router.post('/', createItem)
...
```

Luego, creamos el método del controlador que se encargara de capturar la data y guardarla en la base de datos (es importante que la data cumpla con la estructura del modelo, en especial los datos que sean requeridos):

```js
const createItem = async (req, res) => {
    const { body } = req
    const data = await tracksModel.create(body)
    return res.send({ data })
}
```

Dentro de un API Client como POSTMAN, Thunder Client, o REST Client en VSCode, ingresamos nuestro endpoint, definimos el método POST y luego enviamos la data en formato JSON. Un ejemplo de como se vería la información para el envió de una canción sería la siguiente:

```json
{
    "name": "Some track",
    "album": "Strange",
    "cover": "http://some.com",
    "artist": {
        "name": "Ferrer",
        "nickname": "Ferrer",
        "nationality": "CO"
    },
    "duration": {
        "start": 1,
        "end": 2 
    },
    "mediaId": "621e7499a1f699063f5114bc"
}
```

Cuando enviamos la información mediante el endpoint vamos a obtener un error, puesto que aún no le permitimos a nuestra aplicación que reciba información en json dentro del body. Para arreglar esto, vamos al archivo `app.js` y añadimos la siguiente línea:

```js
...
app.use(express.json())
...
```

Cuando volvemos a enviar la data, obtenemos como respuesta la información que enviamos y 3 campos más: `id`, `createdAt` y `updateAt`.

| Anterior                         |                        | Siguiente                                 |
| -------------------------------- | ---------------------- | ----------------------------------------- |
| [Contralores](06_Contralores.md) | [Readme](../README.md) | [Archivos - Multer](08_Archivo_Multer.md) |
