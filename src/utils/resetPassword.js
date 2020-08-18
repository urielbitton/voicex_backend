const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const usersDAO = require('../api/v1/users/dao')

exports.createResetPasswordToken = async (user) => {
    try {
        const buffer = crypto.randomBytes(10)
        const payload = buffer.toString('hex')
        const token = await jwt.sign({user: user.email}, payload, {
            expiresIn: 3600 // 1 hour
        })
        await usersDAO.update(user._id, {$set:{reset_token: token}})
        return token
    } catch (err) {
        throw new Error(err)
    }
}
exports.createResetPasswordUrl = (user, token) => {
    const domain = process.env.APP_DOMAIN
    return `${domain}reset-password/${user.email}/${token}`
}