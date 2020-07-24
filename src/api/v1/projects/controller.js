const { ObjectId } = require("mongodb")
const projectsDAO = require('./dao')
exports.create = async (req, res) =>{
    try {
        const  project  = req.body
        const {user_id} = req.params
        const data = Object.assign({}, {user_id: ObjectId(user_id)}, project, {last_modified: new Date()})
        await projectsDAO.create(data)
        res.send(data)
    } catch(e) {
        res.status(500)
        res.send(e)
        return
    }
}