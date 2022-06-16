const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require('../models')


const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return handleHttpError(res, 'Not Token', 401) 

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken._id) return handleHttpError(res, 'Error id token', 401)

        req.user = await usersModel.findById(dataToken._id)

        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Not Session', 401)
    }
}


module.exports = authMiddleware