const fastify = require('fastify')({ logger: true })
//Declare a route
fastify.get('/', async (request, reply) => {
    //return test response
    return { hello: 'world' }
})

//Define server
const start = async () => {
    try {
        await fastify.listen(3005)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(error)
        process.exit(1)
    }
}
//Run server
start()
