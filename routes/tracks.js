const { Router } = require('express')
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks')
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')

const router = Router()


router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.post('/', validatorCreateItem, createItem)
router.put('/:id', [validatorGetItem, validatorCreateItem], updateItem)
router.delete('/:id', validatorGetItem, deleteItem)


module.exports = router