# Soft Delete - Eliminación Lógica

El Soft Delete es una estrategia de eliminación lógica de la data, con el fin de mantener la persistencia de los datos, pero inhabilitando su estado.

Vamos a usar Mongo Compass, para crear una nueva conexión usando nuestra DB_URI que tenemos dentro de la variables de entorno:

```.env
DB_URI = 'mongodb+srv://<user>:<password>@cluster<clusterid>.mongodb.net/<db_name>?retryWrites=true&w=majority'
```

Si recordamos, tenemos un cluster llamado `db_api`, y es aquí donde tenemos todos los datos correspondientes a nuestra aplicación dentro de colecciones.

Ahora, vamos a instalar un nuevo paquete en nuestro proyecto con el comando a continuación. Dicho paquete nos servirá de plugin para tener diversas estrategias de eliminación:

```txt
npm i mongoose-delete -S
```

En los modelos en los que queremos aplicar la estrategia de Soft delete, vamos a hacer la siguiente configuración (por ejemplo el modelo de las pistar):

```js
...
const mongooseDelete = require('mongoose-delete');

...
TrackSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = model('tracks', TrackSchema)
```

Dentro del controlador del modelo, haremos uso del método `delete` (provisto por `mongoose-delete`) para hacer la eliminación lógica:

```js
const deleteItem = async (req, res) => {
    try {
        ...
        const data = await tracksModel.delete({ _id: id })
        ...
    } catch (error) { ... }
}
```

Con lo anterior hemos logrado añadir un campo llamado `deleted` dentro de los documentos en la base de datos. Cuando eliminamos un dato, se mantiene la integridad referencia, pero aparece como si se hubiese eliminado por completo de la base de datos al momento de hacer consultas como ellos.

Para la eliminación de los archivo almacenados, hacemos lo siguiente dentro del controlador:

```js
const fs = require('fs')
...
const MEDIA_PATH = `${__dirname}/../storage`
...
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const { filename } = await storagesModel.findById(id)
        await storagesModel.findByIdAndDelete(id)

        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)

        const data = {
            filePath,
            deleted: 1
        }
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en storages/deleteItem', 500)
    }
}
```

___
| Anterior                                  |                        | Siguiente |
| ----------------------------------------- | ---------------------- | --------- |
| [Manejo de errores](14_Manejo_Errores.md) | [Readme](../README.md) | [JWT (Json Web Token)](16_JWT.md) |
