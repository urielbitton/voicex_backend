const userController = require('./controller')

async function userRoutes(fastify, options) {
    fastify.post('/users/login', userController.login)
    fastify.post('/users/sign-up', userController.signUp)
    fastify.post('/users/forgot-password', userController.forgotPassword)
    fastify.post('/users/reset-password/:email/:token', userController.resetUserPassword)
    fastify.put('/users/:user_id/settings', userController.updateUserSettings)
}

module.exports = userRoutes
