require('dotenv').config()

const express = require('express')
const cors = require('cors')

const morganBody = require('morgan-body')

const { dbConnectNoSQL } = require('./config/mongo')
const { dbConnectMySQL } = require('./config/mysql')

const loggerStream = require('./utils/handleLogger')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
})


const port = process.env.PORT || 4000

app.use('/api', require('./routes'))


console.clear()

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})


const ENGINE_DB = process.env.ENGINE_DB

if (ENGINE_DB === 'nosql') {
    dbConnectNoSQL()
} else {
    dbConnectMySQL()
}