const { ObjectId } = require("mongodb")

let projects
exports.injectDB = async (conn) => {
    if (projects) return
    try {
        projects = await conn.db(process.env.VOICEX_NS).collection('projects')
    } catch (e) {
        console.error(`Unable to establish connection in projectsDAO: ${e}`)
    }
}
exports.create =  async (project) => {
    try {
        return await projects.insertOne(project)
    } catch (e) {
        throw e
    }
}