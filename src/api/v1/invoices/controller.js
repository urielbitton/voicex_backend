const invoicesDAO = require('./dao')
const { ObjectId } = require('mongodb')


exports.findByUser = async(req, res) =>{
    try {
        const {  user_id } = req.params
        const filter = { user_id: ObjectId(user_id) }
        const invoices = await invoicesDAO.find(filter)
        res.send(invoices)
        return
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}
exports.findByProject = async (req, res) => {
    try {
        const { project_id, user_id } = req.params
        const filter = { project_id: ObjectId(project_id), user_id: ObjectId(user_id) }
        const invoices = await invoicesDAO.find(filter)
        res.send(invoices)
        return
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}
exports.create = async (req, res) => {
    try {
        const { invoice_number, client_name, invoice_total, balance, due_date, status, currency} = req.body
        const { project_id, user_id } = req.params
        const invoice = Object.assign(
            {},
            { project_id: ObjectId(project_id), user_id: ObjectId(user_id) },
            { invoice_number, client_name, invoice_total, balance, due_date, status, currency },
            { last_modified: new Date() }
        )
        const {ops} = await invoicesDAO.create(invoice)
        res.send(ops)
        return
    } catch (e) {
        res.status(500)
        res.send(e)
        return
    }
}

exports.update = async (req, res) => {
    try {
        const { invoice_number, client_name, invoice_total, balance, due_date, status, currency} = req.body
        const { invoice_id, project_id, user_id } = req.params
        const update = {
            $currentDate: {
                last_modified: true
            },
            $set: {
                invoice_number, client_name, invoice_total, balance, due_date, status, currency
            }
        }
        console.log(update)
        const result = await invoicesDAO.update(invoice_id, project_id, user_id, update)
        const { n, ok } = result.result
        const { modifiedCount } = result
        res.send({ n: n, ok: ok, modifiedCount: modifiedCount })
        return
    } catch(e){
        res.status(500)
        res.send(e)
        return
    }
}

exports.delete = async (req,res) => {
    try {
        const { invoice_id, project_id, user_id } = req.params
        const result = await invoicesDAO.delete(invoice_id, project_id, user_id)
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