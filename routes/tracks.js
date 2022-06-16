const { Router } = require('express')
const { getItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/tracks')
const checkRol = require('../middlewares/rol')
const authMiddleware = require('../middlewares/session')
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')

const router = Router()


router.get('/', authMiddleware, getItems)
router.get(
    '/:id',
    [authMiddleware, validatorGetItem],
    getItem
)
router.post(
    '/',
    [authMiddleware, checkRol('admin', 'user'), validatorCreateItem],
    createItem
)
router.put(
    '/:id',
    [authMiddleware, checkRol(['admin', 'user']), validatorGetItem, validatorCreateItem],
    updateItem
)
router.delete(
    '/:id',
    [authMiddleware, checkRol(['admin']), validatorGetItem],
    deleteItem
)


module.exports = router