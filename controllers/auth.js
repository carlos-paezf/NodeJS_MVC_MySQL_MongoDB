const { matchedData } = require('express-validator')
const { encrypt } = require('../utils/handlePassword')
const { usersModel } = require('../models')


const register = async (req, res) => {
    const { password, ...rest } = matchedData(req)

    const data = await usersModel.create({
        ...rest,
        password: await encrypt(password)
    })
    data.set('password', undefined, { strict: false })
    return res.send({ data })
}

const login = async (req, res) => { }


module.exports = { login, register }