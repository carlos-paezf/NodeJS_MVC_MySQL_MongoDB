const mongoose = require('mongoose')


/**
 * This function connects to the database using the URI stored in the environment variable DB_URI.
 */
const dbConnectNoSQL = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error, res) => {
            if (!error) console.log(' > Conexión establecida con la base de datos nosql')
            else console.log(' > Error de conexión con la base de datos')
        }
    )
}


module.exports = { dbConnectNoSQL }