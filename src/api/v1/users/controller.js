const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const usersDAO = require('./dao')
const emailService = require('../../../services/email/emailService')

/**
 * Creates a new user if user with provided email does not already exist
 * @param {*} req
 * @param {*} res
 */
exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await usersDAO.findOne(email)
        //TO-DO: Add error constants
        if (existingUser) {
            res.status(400)
            res.send(new Error(`User account already exists`))
        }
        // hash user password before storing
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await usersDAO.create({ email: email, password: hashedPassword, createdAt: new Date() })
        //TO-DO: Standardize successful sign up response
        res.send({ id: newUser.insertedId, email: email })
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}

/**
 * Logs in current user and returns jwt auth token
 * @param {*} req
 * @param {*} res
 * @returns JWT Auth token
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        //check if user exists
        const existingUser = await usersDAO.findOne(email)
        if (!existingUser) {
            res.status(400)
            res.send(new Error(`User account doesn't exist`))
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
            // assign jwt auth token
            const token = await jwt.sign({user: existingUser.email}, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
            })
            res.send({ token: token })
        } else {
            res.status(400)
            res.send(new Error(`Password incorrect`))
        }
    } catch (error) {
        res.status(500)
        res.send(error)
        return
    }
}

/**
 * Sends password reset email to user
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        //check if user exists
        const existingUser = await usersDAO.findOne(email)
        if (!existingUser) {
            res.status(400)
            res.send(new Error(`User account doesn't exist`))
        }
        let token = await createResetPasswordToken(existingUser)
        let url = createResetPasswordUrl(existingUser, token)
        let result = await emailService.sendEmail(`fjgenus@gmail.com`, url)
        res.send({ ok: result })
    } catch (error) {
        res.status(500)
        res.send(error)
        return
    }
}

const createResetPasswordToken = async (user) => {
    try {
        const buffer = crypto.randomBytes(20)
        const payload = buffer.toString('hex')
        const token = await jwt.sign({user: user._id}, payload, {
            expiresIn: 3600 // 1 hour
        })
        return token
    } catch (err) {
        throw new Error(err)
    }
}
const createResetPasswordUrl = (user, token) => {
    return `http://localhost:3005/user/${user._id}/reset-password?token=${token}`
}
