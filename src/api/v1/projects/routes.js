const projectsController = require('./controller')
async function projectRoutes(fastify, options) {
    fastify.get('/users/:user_id/projects/', projectsController.find)
    fastify.get('/users/:user_id/projects/:project_id', projectsController.findById)
    fastify.post('/users/:user_id/projects/', projectsController.create)
    fastify.put('/users/:user_id/projects/:project_id', projectsController.update)
    fastify.delete('/users/:user_id/projects/:project_id', projectsController.delete)
}

module.exports = projectRoutes