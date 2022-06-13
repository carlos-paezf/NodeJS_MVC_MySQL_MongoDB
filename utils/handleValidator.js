const { validationResult } = require('express-validator')


/**
 * Si la validación del resultado es valido, entonces se llama la función `next`. Si la validación es invalida,
 * se envía un código 403 con los errores
 * @param req
 * @param res
 * @param next
 * @returns La función `next()` si todo va bien, o el error en caso contrario.
 */
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        return res.status(403).send({ errors: error.array() })
    }
}


module.exports = validateResults