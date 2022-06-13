# Primer encuentro con express

En la base de nuestro directorio del proyecto, creamos un archivo llamado `.env`, en el que tendremos las variables de entorno que se dispondrán para nuestro proyecto. Es importante que las credenciales que aquí reposan, no sean expuestas al público, por lo tanto añadimos el path de este archivo dentro de `.gitignore`, pero para tener una base de cuales variables se están usando, podemos crear un archivo llamado `.env.example` para tener enunciados los nombres de las variables:

```.env
PORT = 0000
```

Vamos a crear un archivo simple en la raíz de nuestro proyecto llamado `app.js`, dentro del cual configuramos un ejemplo de la conexión de nuestra aplicación. Llamamos el paquete `dotenv` para que se use la configuración de las variables de entorno, y luego establecemos que nuestra aplicación sea de tipo `express()` y que haga uso de `cors`. Establecemos el puerto y la función de escucha del servidor.:

```js
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})
```

Ejecutamos nuestro archivo con el comando:

```txt
node app.js
```

___
| Anterior |                        | Siguiente                                              |
| -------- | ---------------------- | ------------------------------------------------------ |
|          | [Readme](../README.md) | [Scaffolding: Estructura del proyecto](02_Scaffold.md) |
