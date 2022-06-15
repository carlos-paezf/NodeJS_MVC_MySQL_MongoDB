const { Router } = require('express')
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage')
const uploadMiddleware = require('../utils/handleStorage')
const { validatorGetItem } = require('../validators/storages')

const router = Router()


router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', uploadMiddleware.single('myFile'), createItem)
router.delete('/:id', validatorGetItem, deleteItem)


module.exports = router