const userController = require('./controller')

async function userRoutes(fastify, options) {
    fastify.post('/users/login', userController.login)
    fastify.post('/users/sign-up', userController.signUp)
}

module.exports = userRoutes
