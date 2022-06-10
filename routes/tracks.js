const { Router } = require('express')
const { getItems, createItem } = require('../controllers/tracks')

const router = Router()


router.get('/', getItems)
router.post('/', createItem)


module.exports = router