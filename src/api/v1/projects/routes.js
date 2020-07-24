const projectsController = require('./controller')
async function projectRoutes(fastify, options) {
    fastify.post('/users/:user_id/projects/', projectsController.create)
}

module.exports = projectRoutes