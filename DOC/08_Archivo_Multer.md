# Archivos - Multer en NodeJS

Vamos a crear un archivo llamado `utils/handleStorage.js`, en el cual configuraremos una constante que almacena el retorno de la función `diskStorage` del paquete multer. Dicha función nos permite hacer la configuración del almacenamiento de archivo en local, teniendo como propiedades importantes el path de destino y el nombre del archivo.

Luego, creamos una variable que actuara de middleware dentro de la ruta de la subida de archivos, y que por valor de opciones tendrá la constante anterior:

```js
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathStorage = `${__dirname}/../storage`
        callback(null, pathStorage)
    },
    filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop()
        const filename = `file-${Date.now()}.${ext}`
        callback(null, filename)
    }
})

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware
```

> Un middleware actúa entre el endpoint y el controlador, es básicamente un punto de control de los datos que envía el usuario, antes de que ingresen a la base de datos. Su forma de uso es como la siguiente:
>
> ```js
> router.get('/endpoint', middleware, controller)
> ```

Ahora, vamos a nuestro archivo `routes/storage.js` y configuramos la ruta para la carga de archivos:

```js
const { Router } = require('express')
const { createItem } = require('../controllers/storage')
const uploadMiddleware = require('../utils/handleStorage')

const router = Router()

router.post('/', uploadMiddleware.single('myFile'), createItem)

module.exports = router
```

Antes de pasar a explicar el controlador, debemos hacer una configuración en el archivo `app.js`, para poder leer los archivos estáticos que se encuentran en nuestro servidor, en este caso los archivos que subamos por nuestro endpoint, y que se guardarán en el directorio `storage`. Para validar el acceso a los mismos mediante una URL (como por ejemplo `http://localhost:3000/<nombre_archivo>`), usamos lo siguiente:

```js
...
app.use(express.static('storage'))
...
```

Vamos a guardar la url de acceso público a nuestro server como una variable de entorno, para luego poder acceder a ella desde nuestro proyecto:

```.env
...
PUBLIC_URL = http://localhost:3000
```

Ahora si, vamos al archivo `controllers/storage.js` y añadimos el método para añadir un elemento a la base de datos. Guardamos la variable de entorno que acabamos de crear, y luego dentro del controlador extraemos la propiedad `filename` de `req.file`, la cual usamos como información del registro a guardar en el modelo de la base de datos:

```js
const { storagesModel } = require('../models')

const PUBLIC_URL = process.env.PUBLIC_URL

const createItem = async (req, res) => {
    const { file: { filename } } = req
    const fileData = {
        filename,
        url: `${PUBLIC_URL}/${filename}`
    }
    const data = await storagesModel.create(fileData)
    return res.send({ data })
}

module.exports = {
    createItem
}
```

| Anterior                                   |                        | Siguiente                                  |
| ------------------------------------------ | ---------------------- | ------------------------------------------ |
| [Cargando Modelos](07_Cargando_Modelos.md) | [Readme](../README.md) | [POSTMAN API Node](09_POSTMAN_API_Node.md) |
