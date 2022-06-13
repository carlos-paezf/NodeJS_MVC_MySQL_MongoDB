# Middlewares

Vamos a crear un directorio llamado `middlewares`, en donde almacenaremos los middlewares que se encargan de analizar la data del usuario y entregarla al controlador, o devolver un error.

A continuación vamos a ver un ejemplo de un middleware simple que verifique si se ha enviado una propiedad dentro del objeto de los Headers. La idea es que hay un error de nuestra parte, se muestre un código de error 500, pero si el error del usuario, se muestre un status 403. En caso de que todo vaya bien, se retorna la función `next()` para proseguir al controlador:

```js
const customHeader = (req, res, next) => {
    try {
        const { api_key } = req.headers
        if (api_key === 'key_public') return next()
        return res.status(403).send({ error: 'api_key no es correcta'})
    } catch (error) {
        return res.status(500).send({ error: 'Error en customHeader'})
    }
}

module.exports = customHeader
```

Como hemos visto lecciones pasadas, el middleware se configura entre el endpoint y el controlador de la ruta. Por ejemplo si queremos aplicar el middleware anterior al endpoint para obtener todas las pistas, haríamos lo siguiente:

```js
...
const customHeader = require('../middlewares/customHeader')
...
router.get('/', customHeader, getItems)
...
```

___
| Anterior                                  |                        | Siguiente                        |
| ----------------------------------------- | ---------------------- | -------------------------------- |
| [Como subir un mp3](11_Como_Subir_mp3.md) | [Readme](../README.md) | [Código de respuesta de encabezado](13_Codigo_Respuesta_Encabezado.md) |
