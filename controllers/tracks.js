const { matchedData } = require('express-validator')
const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')


/**
 * Get all items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const { user } = req
        const data = await tracksModel.find({})
        return res.send({ data, user })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItems', 500)
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
        const data = await tracksModel.findById(id)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/getItem', 500)
    }
}

/**
 * Create a new Item
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/createItem', 500)
    }
}

/**
 * Update an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...rest } = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(id, rest)
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/updateItem', 500)
    }
}

/**
 * Delete an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await tracksModel.delete({ _id: id })
        return res.send({ data })
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error en tracks/deleteItem', 500)
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
}