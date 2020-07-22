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
        await usersDAO.update(user.email, {$set:{reset_token: token}})
        return token
    } catch (err) {
        throw new Error(err)
    }
}
exports.createResetPasswordUrl = (user, token) => {
    return `http://localhost:3005/users/reset-password/${user.email}/${token}`
}