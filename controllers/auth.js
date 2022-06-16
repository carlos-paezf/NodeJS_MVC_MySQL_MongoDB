const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../utils/handleJwt')
const { handleHttpError } = require('../utils/handleError')


const register = async (req, res) => {
    try {
        const { password, ...rest } = matchedData(req)

        const user = await usersModel.create({
            ...rest,
            password: await encrypt(password)
        })
        user.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(user),
            user
        }
        return res.send({ data })
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en auth/register', 500)
    }
}

const login = async (req, res) => {
    try {
        const { password, email } = matchedData(req)
        
        const user = await usersModel.findOne({ email }).select('password name role email')
        if (!user) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

        const check = await compare(password, user.password)
        if (!check) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

        user.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(user),
            user
        }

        return res.send({ data })
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en auth/login', 500)
    }
}


module.exports = { login, register }