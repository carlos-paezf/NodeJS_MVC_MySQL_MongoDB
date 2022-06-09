# Mongoose y MongoDB

## Mongoose ODM y Conexión a la base de datos

Un ODM se relaciona con un modelo de objetos y una base de datos de documentos, o las bien conocidas como bases de datos no relacionales. El paquete *mongoose* es un ODM que nos permite interactuar con nuestra base de datos en MongoDB. Para instalar dicho modulo, usamos el comando:

```txt
npm i mongoose -S
```

Para conectar con nuestro cluster en Mongo, creamos un archivo llamado `config/mongo.js`, dentro del cual exportamos una función con la lógica de la conexión a Mongo Atlas mediante la URI que la misma plataforma nos brindo. Dicha URI, al ser un dato sensible, la vamos a guardar dentro del archivo `.env`, y su ejemplo en `.env.example`:

```.env
DB_URI = 'mongodb+srv://<user>:<password>@cluster0.7ndzkvx.mongodb.net/<db_name>?retryWrites=true&w=majority'
```

Volviendo a nuestro archivo `mongo.js`, tenemos la función que se encarga de hacer la conexión mediante el URI:

```js
const mongoose = require('mongoose')

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error, res) => {
            if (!error) console.log(' > Conexión establecida con la base de datos')
            else console.log(' > Error de conexión con la base de datos')
        }
    )
}

module.exports = dbConnect
```

Luego, dentro de `app.js`, importamos nuestra función y la llamamos luego del punto de escucha de nuestro server:

```js
const dbConnect = require('./config/mongo')
...
dbConnect()
```

## Models: Definiendo modelo mongoose

Los modelos hacen referencia a la estructura que tendrán los datos en nuestra base de datos. En las bases de datos no relacionales, se hace referencia a documentos y colecciones, siendo la primera lo que en en SQL se conoce como registro, y la segunda se conoce como tabla.

Vamos a crear un nuevo archivo para el modelo de usuarios, llamado `models/nosql/users.js`. Podemos importar `mongoose` o directamente los elementos que requerimos de dicho paquete. Estructuramos nuestro esquema con los elementos y el tipo de los mismos que tendrá nuestra colección, y por último exportamos como modelo nuestro esquema con el nombre que se manejará dentro de MongoAtlas.

```js
const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        name: {
            type: String
        }, 
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: tue
        },
        password: {
            type: String
        },
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('users', UserSchema)
```

Hacemos lo mismo para los modelos de `storages` y `tracks`:

```js
const { Schema, model } = require('mongoose')

const StorageSchema = new Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('storages', StorageSchema)
```

Para el modelo de las pistas de las canciones tenemos algunas diferencias, puesto que tenemos objetos anidados y una validación (actualmente solo regresa `true`, pero luego se estable el patrón a validar).

```js
const { Schema, model, Types } = require('mongoose')

const TrackSchema = new Schema(
    {
        name: { 
            type: String 
        },
        album: { 
            type: String 
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    // TODO: Validar la URL
                    return true;
                },
                message: "ERROR_URL"
            }
        },
        artist: {
            name: { 
                type: String 
            },
            nickname: { 
                type: String 
            },
            nationality: { 
                type: String 
            }
        },
        duration: {
            start: { 
                type: Number 
            },
            end: { 
                type: Number 
            }
        },
        mediaId: { 
            type: Types.ObjectId 
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('tracks', TrackSchema)
```

| Anterior                                               |                        | Siguiente                            |
| ------------------------------------------------------ | ---------------------- | ------------------------------------ |
| [Scaffolding: Estructura del proyecto](02_Scaffold.md) | [Readme](../README.md) | [Rutas en Node Express](03_Rutas.md) |
