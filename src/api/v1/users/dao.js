let users
exports.injectDB = async (conn) => {
    if (users) return
    try {
        users = await conn.db(process.env.VOICEX_NS).collection('users')
    } catch (e) {
        console.error(`Unable to establish connection in usersDAO: ${e}`)
    }
}

exports.findOne = async (email) => {
    try {
        return await users.findOne({ email: email })
    } catch (e) {
        throw e
    }
}

exports.create = async (user) => {
    try {
        return await users.insertOne(user)
    } catch (e) {
        throw e
    }
}

exports.update = async(email, update) => {
    try {
        return await users.updateOne({email: email}, update)
    } catch(e) {
        throw e
    }
}
