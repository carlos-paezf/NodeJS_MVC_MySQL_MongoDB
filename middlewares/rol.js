const { handleHttpError } = require("../utils/handleError")


const checkRol = (...roles) => (req, res, next) => {
    try {
        const { user } = req
        const rolesByUser = user.role

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if (!checkValueRol) return handleHttpError(res, 'User not permissions', 401)

        next()
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en checkRol', 500)
    }
}


module.exports = checkRol