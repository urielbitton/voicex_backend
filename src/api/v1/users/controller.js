const bcrypt = require('bcryptjs')
const usersDAO = require('./dao')
exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await usersDAO.findOne(email)
        let newUser
        let hashedPassword = ''
        //TO-DO:
        // Add error constants
        if (existingUser) {
            res.status(400)
            res.send(new Error(`User account already exists`))
        }
        bcrypt
            .genSalt()
            .then(async (salt) => {
                return (hashedPassword = bcrypt.hash(password, salt))
            })
            .then(async (hashedPassword) => {
                newUser = await usersDAO.create({ email: email, password: hashedPassword })
                //TO-DO: assign jwt auth token
                const { insertedId } = newUser
                //TO-DO: Standardize successful sign up response
                res.send({ id: insertedId, email: email })
            })
    } catch (e) {
        res.code(500)
        res.send(e)
        return
    }
}
