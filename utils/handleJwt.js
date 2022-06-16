const { sign, verify } = require('jsonwebtoken')
const getProperties = require('./handlePropertiesEngine')

const propertiesKey = getProperties()

const JWT_SECRET = process.env.JWT_SECRET


const tokenSign = async (user) => sign(
    {
        [propertiesKey.id]: user[propertiesKey.id],
        role: user.role
    },
    JWT_SECRET,
    { expiresIn: "2h" }
)


const verifyToken = async (token) => {
    try {
        return verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }