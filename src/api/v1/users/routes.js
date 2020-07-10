const userController = require('./controller')

async function userRoutes(fastify, options) {
    fastify.post('/users/login', async (request, reply) => {
        return { hello: 'world' }
    })
    fastify.post('/users/sign-up', userController.signUp)
}

module.exports = userRoutes
