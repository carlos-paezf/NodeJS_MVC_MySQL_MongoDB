# Creando modelos Sequelize

Vamos a crear los 3 modelos que hemos estado manejando en el proyecto, pero ahora con sequelize:

```js
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: { type: DataTypes.NUMBER },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(['user', 'admin']),
            defaultValue: 'user'
        }
    },
    {
        timestamps: true
    }
)

module.exports = User
```

```js
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require('sequelize')

const Tracks = sequelize.define(
    'tracks',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: { type: DataTypes.STRING },
        cover: { type: DataTypes.STRING },
        artist_name: { type: DataTypes.STRING },
        artist_nickname: { type: DataTypes.STRING },
        artist_nationality: { type: DataTypes.STRING },
        duration_start: { type: DataTypes.INTEGER },
        duration_end: { type: DataTypes.INTEGER },
        mediaId: { type: DataTypes.STRING }
    },
    {
        timestamps: true
    }
)

module.exports = Tracks
```

```js
const { sequelize } = require("../../config/mysql");
const { DataTypes } = require('sequelize')

const Storage = sequelize.define(
    'storages',
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
)


module.exports = Storage
```

Teniendo en cuenta que los documentos de una base de datos no relacional, y los registros de una base de datos relacional presentan cambios en algunos elementos (por ejemplo `_id` en Mongo, `id` es MySQL), vamos a crear un archivo llamado `utils/handlePropertiesEngine.js`:

```js
const ENGINE_DB = process.env.ENGINE_DB

const getProperties = () => {
    const data = {
        nosql: {
            id: '_id'
        },
        mysql: {
            id: 'id'
        }
    }
    return data[ENGINE_DB]
}

module.exports = getProperties
```

Dentro de los archivo donde se manejan las propiedades de `id` implementamos la función anterior. Por ejemplo para `utils/handleJwt.js`:

```js
const getProperties = require('./handlePropertiesEngine')

const propertiesKey = getProperties()
...

const tokenSign = async (user) => sign(
    {
        [propertiesKey.id]: user[propertiesKey.id],
        role: user.role
    },
    JWT_SECRET,
    { expiresIn: "2h" }
)
```

También debemos modificar `middlewares/session.js`, pero aquí hay una modificación importante, puesto que debemos usar un método en común para mongoose y sequelize con el fin de realizar la consulta del usuario, y este método es `findOne`:

```js
...
const getProperties = require('../utils/handlePropertiesEngine')

const propertiesKey = getProperties()


const authMiddleware = async (req, res, next) => {
    try {
        ...
        if (!dataToken) return handleHttpError(res, 'Error data token', 401)

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
        req.user = await usersModel.findOne(query)

        next()
    } catch (error) { ... }
}
```

Dentro de nuestra base de datos vamos a ejecutar la siguiente sentencia:

```sql
CREATE DATABASE IF NOT EXISTS `db_node`;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE storages (
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE tracks (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    artist_nickname VARCHAR(255) NOT NULL,
    artist_nationality VARCHAR(255) NOT NULL,
    duration_start INT NOT NULL,
    duration_end INT NOT NULL,
    mediaId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

Otra cosa que necesitamos hacer es cambiar el path de los modelos de manera dinámica, para lo cual haremos lo siguiente en `models/index.js`

```js
const ENGINE_DB = process.env.ENGINE_DB

const pathModels = (ENGINE_DB === 'nosql') ? './nosql' : './mysql'

const models = {
    usersModel: require(`${pathModels}/users`),
    tracksModel: require(`${pathModels}/tracks`),
    storagesModel: require(`${pathModels}/storage`),
}
```

También hacemos una modificación dentro de `controllers/auth.js`, y en otros archivos que tengan el mismo problema:

```js
...
const ENGINE_DB = process.env.ENGINE_DB
...
const login = async (req, res) => {
    try {
        ...
        const user = (ENGINE_DB === 'nosql') 
            ? await usersModel.findOne({ email }).select('password name role email')
            : await usersModel.findOne({ email })
        ...
    } catch (error) { ... }
}
```

___
| Anterior                |                        | Siguiente                                                  |
| ----------------------- | ---------------------- | ---------------------------------------------------------- |
| [MySQL Sequelize en Node](21_MySQL_Sequelize_Node.md) | [Readme](../README.md) | [Aplicando métodos personalizados](23_Aplicando_Metodos_Personalizados.md) |
