const { storagesModel } = require('../models')

const PUBLIC_URL = process.env.PUBLIC_URL


/**
 * Guardamos la información de la ubicación del archivo en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const { file: { filename } } = req
    const fileData = {
        filename,
        url: `${PUBLIC_URL}/${filename}`
    }
    const data = await storagesModel.create(fileData)
    return res.send({ data })
}


module.exports = {
    createItem
}