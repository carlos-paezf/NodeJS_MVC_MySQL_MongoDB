const { matchedData } = require('express-validator')
const { encrypt } = require('../utils/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../utils/handleJwt')


const register = async (req, res) => {
    const { password, ...rest } = matchedData(req)

    const user = await usersModel.create({
        ...rest,
        password: await encrypt(password)
    })
    user.set('password', undefined, { strict: false })

    const data = {
        token: tokenSign(user),
        user
    }
    return res.send({ data })
}

const login = async (req, res) => { }


module.exports = { login, register }