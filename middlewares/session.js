const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require('../models')
const getProperties = require('../utils/handlePropertiesEngine')

const propertiesKey = getProperties()


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return handleHttpError(res, 'Not Token', 401)

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken) return handleHttpError(res, 'Error data token', 401)

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
        req.user = await usersModel.findOne(query)

        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Not Session', 401)
    }
}


module.exports = authMiddleware