# Rutas en Node Express

Vamos a declarar las diversas rutas para nuestros modelos. Una ruta es un punto de acceso a un servicio que actúa sobre uno o varios modelos.

Para configurar las rutas dentro de nuestra aplicación, hacemos uso de la función `Router`, la cual viene del paquete `express`. Lo que hacemos es crear una variable que almacene su valor de configuración, y luego lo exportamos.

```js
const { Router } = require('express')
const router = Router()
...
module.exports = router
```

Para configurar una ruta, tenemos una firma de las funciones `get`, `post`, `put`, `delete`, etc., en la que ponemos el nombre de la ruta y declaramos el controlador de la misma, por ejemplo:

```js
...
router.get('/tracks', (req, res) => {
    const data = ['Hola', 'mundo']
    res.send({ data })
})
```

## Rutas dinámicas

Queremos tener rutas dinámicas en base al nombre de los archivos que las contienen, por ejemplo, si el archivo se llama `tracks.js`, queremos que su endpoint base sea `/tracks`. Para esto, vamos a crear un archivo llamado `routes/index.js`, en que haremos estás rutas dinámicas, pero primero, vamos a ir a `app.js` y definir el uso de las rutas para nuestro servidor:

```js
app.use('/api', require('./routes'))
```

Como nos damos cuenta, estamos llamando a `./routes`, y esto es por qué se reconoce de manera automática el archivo `routes/index.js`. Ahora si, dentro de este archivo, nos vamos a encargar de exportar la configuración de la función `Router`, con las rutas base de cada archivo. Los endpoints se van a definir en base al nombre de cada archivo, por lo que tenemos un método que se encarga de separarlos de la extensión (en este caso `.js`), y usar dichos nombres para cada ruta:

```js
const fs = require('fs')
const { Router } = require('express')

const router = Router()

const PATH_ROUTES = __dirname

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
        router.use(`/${name}`, require(`./${name}`))
    }
})

module.exports = router
```

___
| Anterior                                     |                        | Siguiente                             |
| -------------------------------------------- | ---------------------- | ------------------------------------- |
| [Mongoose y MongoDB](03_Mongoose_MongoDB.md) | [Readme](../README.md) | [Creando alías Script](05_Scripts.md) |
