const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersDAO = require('./dao')
const emailService = require('../../../services/email/emailService')
const resetPasswordUtil = require('../../../utils/resetPassword')
const templateUtil = require('../../../utils/emailTemplates')

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
            return
        }
        // hash user password before storing
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await usersDAO.create({ email: email, password: hashedPassword, createdAt: new Date() })
        //TO-DO: Standardize successful sign up response
        res.send({ id: newUser.insertedId, email: email })
        return
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
            return
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
            // assign jwt auth token
            const token = await jwt.sign({user: existingUser.email}, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
            })
            res.send({ token: token })
            return
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
            return
        }
        let token = await resetPasswordUtil.createResetPasswordToken(existingUser)
        let url = resetPasswordUtil.createResetPasswordUrl(existingUser, token)
        let template = templateUtil.getResetPasswordTemplate(existingUser, url)
        let result = await emailService.sendEmail(existingUser.email, `Reset Password`,template)
        res.send({ ok: result })
    } catch (error) {
        res.status(500)
        res.send(error)
        return
    }
}

/**
 * Resets user's password
 * @param {*} req 
 * @param {*} res 
 */
exports.resetUserPassword = async (req, res) =>{
    try {
        const {email, token} = req.params
        const {password} = req.body
        let user = await usersDAO.findOne(email)
        if (!user) {
            res.status(400)
            res.send(new Error(`User account doesn't exist`))
        }
        if(!token || (user.reset_token !== token)) {
            res.status(400)
            res.send(new Error(`Invalid or expired token`))
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        await usersDAO.update(email, {$set:{password: hashedPassword, reset_token: null}})
        res.status(202)
        res.send({success: `Password changed successfully`})
        return
        // email notification for successful password reset
    } catch (error) {
        res.status(500)
        res.send(error)
        return
    }
}