const invoicesController =require('./controller')
async function invoiceRoutes(fastify, options) {
    fastify.get('/users/:user_id/invoices', invoicesController.findByUser)
    fastify.get('/users/:user_id/projects/:project_id/invoices', invoicesController.findByProject)
    fastify.post('/users/:user_id/projects/:project_id/invoices', invoicesController.create)
    fastify.put('/users/:user_id/projects/:project_id/invoices/:invoice_id', invoicesController.update)   
    fastify.delete('/users/:user_id/projects/:project_id/invoices/:invoice_id', invoicesController.delete)   
}

module.exports = invoiceRoutes