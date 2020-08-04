const { ObjectId } = require('mongodb')

let projects
exports.injectDB = async (conn) => {
    if (projects) return
    try {
        projects = await conn.db(process.env.VOICEX_NS).collection('projects')
    } catch (e) {
        console.error(`Unable to establish connection in projectsDAO: ${e}`)
    }
}
exports.create = async (project) => {
    try {
        return await projects.insertOne(project)
    } catch (e) {
        throw e
    }
}

exports.update = async (project_id, user_id, update) => {
    try {
        return await projects.updateOne({ _id: ObjectId(project_id) , user_id: ObjectId(user_id)}, update)
    } catch (e) {
        throw e
    }
}

exports.delete = async (project_id, user_id) =>{
    try {
        return await projects.deleteOne({_id:ObjectId(project_id), user_id: ObjectId(user_id)})
    } catch (e) {
        throw e
    }
}
