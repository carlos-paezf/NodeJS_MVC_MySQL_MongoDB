const { Sequelize } = require('sequelize')


const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST


const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
})


const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate()
        console.log('> Conexión establecida con la base de datos MySQL')
    } catch (error) {
        console.log(`> MySQL error de conexión: ${error}`)
    }
}


module.exports = { sequelize, dbConnectMySQL }