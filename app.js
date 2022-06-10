require('dotenv').config()

const express = require('express')
const cors = require('cors')

const dbConnect = require('./config/mongo')


const app = express()
app.use(cors())

const port = process.env.PORT || 4000

app.use('/api', require('./routes'))


console.clear()

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})


dbConnect()