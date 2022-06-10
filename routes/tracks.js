const { Router } = require('express')
const { getItems } = require('../controllers/tracks')

const router = Router()


router.get('/', getItems)


module.exports = router