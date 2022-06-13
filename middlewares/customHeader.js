const customHeader = (req, res, next) => {
    try {
        const { api_key } = req.headers
        if (api_key === 'key_public') return next()
        return res.status(403).send({ error: 'api_key no es correcta'})
    } catch (error) {
        return res.status(500).send({ error: 'Error en customHeader'})
    }
}


module.exports = customHeader