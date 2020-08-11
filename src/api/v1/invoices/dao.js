const { ObjectId } = require("mongodb")

let invoices
exports.injectDB =  async(conn) =>{
    if(invoices) return
    try {
        invoices = await conn.db(process.env.VOICEX_NS).collection('invoices')
    } catch (e) {
        console.error(`Unable to establish connection in invoicesDAO: ${e}`)
    }
}

exports.find = async(query={}) =>{
    try {
        let cursor = await invoices.find(query)
        return await cursor.toArray()
    } catch (e) {
        throw e
    }
}

exports.create = async (invoice) => {
    try {
        return await invoices.insertOne(invoice)
    } catch (e) {
        throw e
    }
}

exports.update = async (invoice_id, project_id, user_id, update) => {
    try {
        return await invoices.updateOne({_id: ObjectId(invoice_id), project_id: ObjectId(project_id), user_id: ObjectId(user_id)}, update)
    } catch (e) {
        throw e
    }
}

exports.delete = async(invoice_id, project_id, user_id) => {
    try {
        return await invoices.deleteOne({_id: ObjectId(invoice_id), project_id: ObjectId(project_id), user_id: ObjectId(user_id)})
    } catch(e) {
        throw e
    }
}