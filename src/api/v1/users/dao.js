const { ObjectId } = require("mongodb")

let users
exports.injectDB = async (conn) => {
    if (users) return
    try {
        users = await conn.db(process.env.VOICEX_NS).collection('users')
    } catch (e) {
        console.error(`Unable to establish connection in usersDAO: ${e}`)
    }
}

exports.findOne = async (query = {}) => {
    try {
        return await users.findOne(query)
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

exports.update = async(user_id, update) => {
    try {
        return await users.updateOne({_id: ObjectId(user_id)}, update)
    } catch(e) {
        throw e
    }
}


exports.aggregate = async( pipeline) =>{
    try {
        return await users.aggregate(pipeline).toArray()
    } catch (e) {
       throw e 
    }
}
