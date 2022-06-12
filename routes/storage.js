const { Router } = require('express')
const { createItem } = require('../controllers/storage')
const uploadMiddleware = require('../utils/handleStorage')

const router = Router()


router.post('/', uploadMiddleware.single('myFile'), createItem)


module.exports = router