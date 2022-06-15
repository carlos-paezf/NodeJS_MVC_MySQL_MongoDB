const { Router } = require('express')
const { register, login } = require('../controllers/auth')
const { validatorLogin, validatorRegister } = require('../validators/auth')


const router = Router()


router.post('/register', validatorRegister, register)
router.post('/login', validatorLogin, login)


module.exports = router