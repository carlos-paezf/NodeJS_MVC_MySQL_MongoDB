const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const ENGINE_DB = process.env.ENGINE_DB

const validatorGetItem = (ENGINE_DB === 'nosql')
    ? [
        check("id")
            .exists()
            .notEmpty()
            .isMongoId(),
        validateResults
    ]
    : [
        check("id")
            .exists()
            .notEmpty(),
        validateResults
    ]

module.exports = {
    validatorGetItem
}