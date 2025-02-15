const { ObjectId } = require('mongodb')
const projectsDAO = require('./dao')

exports.find = async (req, res) =>{
    try{
        const { user_id } = req.params
        const filter ={user_id: ObjectId(user_id)}
        const result = await projectsDAO.find(filter)
        res.send(result)
        return
    } catch (e){res.status(500)
        res.send(e)
        return}
}
exports.findById = async(req, res) =>{
    try {
        const { project_id, user_id } = req.params
        const filter = {_id: ObjectId(project_id), user_id: ObjectId(user_id),}
        const result = await projectsDAO.find(filter)
        res.send(result)
        return
    } catch (error) {
        
    }
}
exports.create = async (req, res) => {
    try {
        const project = req.body
        const { user_id } = req.params
        const data = Object.assign({}, { user_id: ObjectId(user_id) }, project, { last_modified: new Date() })
        const {ops} = await projectsDAO.create(data)
        res.send(ops)
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}

exports.update = async (req, res) => {
    try {
        const { project_id, user_id } = req.params
        const { name } = req.body
        const update = {
            $currentDate: {
                last_modified: true
            },
            $set: { name: name }
        }
        const result = await projectsDAO.update(project_id, user_id, update)
        const { n, ok } = result.result
        const { modifiedCount } = result
        res.send({ n: n, ok: ok, modifiedCount: modifiedCount })
        return
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}

exports.delete = async (req,res) => {
    try {
        const { project_id, user_id } = req.params
        const result = await projectsDAO.delete(project_id, user_id)
        const { n, ok } = result.result
        const { deletedCount } = result
        res.send({ n: n, ok: ok, deletedCount: deletedCount })
        return
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}
