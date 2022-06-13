const handleHttpError = (res, error = 'Algo sucedió', code = 403) => res.status(code).send({ error })


module.exports = {
    handleHttpError
}