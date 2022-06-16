# Aplicando métodos personalizados

Vamos a procurar no tocar los controladores al momento de cambiar entre mongo y mysql. Para ello, vamos a crear métodos personalizados dentro de los modelos. Por ejemplo, en el modelo `models/nosql/users.js` hacemos lo siguiente para retornar la data, pero con una relación hacia el archivo de audio:

```js
...
TrackSchema.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        }, 
        {
            $unwind: '$audio'
        }
    ])
    return joinData
}

TrackSchema.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        }, 
        {
            $unwind: '$audio'
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        }
    ])
    return joinData
}
...
```

Ahora vamos a hacer esto con nuestro modelo de mysql:

```js
Tracks.findAllData = function () {
    Tracks.belongsTo(Storage, {
        foreignKey: 'mediaId',
        as: 'audio'
    })
    return Tracks.findAll({ include: 'audio' })
}

Tracks.findOneData = function (id) {
    Tracks.belongsTo(Storage, {
        foreignKey: 'mediaId',
        as: 'audio'
    })
    return Tracks.findOne({ where: { id }, include: 'audio' })
}
```

De esta manera logramos que el controlador pase de ser así:

```js
const getItems = async (req, res) => {
    try {
        const { user } = req
        const data = (ENGINE_DB === 'nosql')
            ? await tracksModel.find({})
            : await tracksModel.findAll()
        return res.send({ data, user })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItems', 500)
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await tracksModel.findOneData(id)
        const data = (ENGINE_DB === 'nosql')
            ? await tracksModel.findById(id)
            : await tracksModel.findByPk(id)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItem', 500)
    }
}
```

... a ser así:

```js
const getItems = async (req, res) => {
    try {
        const { user } = req
        const data = await tracksModel.findAllData()
        return res.send({ data, user })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItems', 500)
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await tracksModel.findOneData(id)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItem', 500)
    }
}
```

___
| Anterior                |                        | Siguiente                                                  |
| ----------------------- | ---------------------- | ---------------------------------------------------------- |
| [Creando modelos Sequelize](22_Creando_Modelos_Sequelize.md) | [Readme](../README.md) |  |
