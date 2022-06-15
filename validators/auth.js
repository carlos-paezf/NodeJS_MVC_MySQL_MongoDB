const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')


const validatorRegister = [
    check('name').exists().notEmpty().isLength({ min: 3, max: 50 }),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail(),
    validateResults
]

const validatorLogin = [
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail(),
    validateResults
]


module.exports = { validatorRegister, validatorLogin }