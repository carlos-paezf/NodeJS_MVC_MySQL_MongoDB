const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')


const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    validateResults
]

module.exports = {
    validatorGetItem
}