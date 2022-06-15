const fs = require('fs')
const { storagesModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')


const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`


/**
 * Get all items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storagesModel.find({})
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en storages/getItems', 500)
    }
}

/**
 * Get an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storagesModel.findById(id)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en storages/getItem', 500)
    }
}

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


/**
 * Delete an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const { filename } = await storagesModel.findById(id)
        await storagesModel.findByIdAndDelete(id)

        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)

        const data = {
            filePath,
            deleted: 1
        }
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en storages/deleteItem', 500)
    }
}


module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem,
}