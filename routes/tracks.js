const { Router } = require('express')

const router = Router()


router.get('/', (req, res) => {
    const data = ['Hola', 'mundo', '2']
    res.send({ data })
})


module.exports = router