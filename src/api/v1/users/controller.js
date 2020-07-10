const usersDAO = require('./dao')
exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await usersDAO.findOne(email)
        //TO-DO:
        // Add error constants
        if (existingUser) {
            res.status(400)
            res.send(new Error(`User account already exists`))
        }
        const newUser = await usersDAO.create({ email: email, password: password })
        //TO-DO: assign jwt auth token
        const { insertedId } = newUser
        //TO-DO: Standardize successful sign up response
        res.send({ id: insertedId, email: email })
    } catch (e) {
        res.code(500)
        res.send(e)
        return
    }
}
