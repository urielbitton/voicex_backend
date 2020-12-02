require('dotenv').config()
const fastify = require('fastify')({ logger: true, maxParamLength: 250 })
const mongodb = require('mongodb')

fastify.register(require('fastify-cors'))
//Declare routes
fastify.register(require('./src/api/v1/users/routes'), { prefix: '/v1' })
fastify.register(require('./src/api/v1/projects/routes'), { prefix: '/v1' })
fastify.register(require('./src/api/v1/invoices/routes'), { prefix: '/v1' })

// Define server and establish MongoDB connection.
// Connection pool is shared application wide
const port = process.env.PORT || 3005

const usersDAO = require('./src/api/v1/users/dao')
const projectsDAO  = require('./src/api/v1/projects/dao')
const invoicesDAO = require('./src/api/v1/invoices/dao')

const start = async () => {
    mongodb.MongoClient.connect(
        process.env.MONGO_DB_URI,
        {
            poolSize: 50,
            wtimeout: 2500,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then( async client => {
        fastify.register(require('fastify-mongodb'), { client: client })
        .register(async function (fastify, opts, next) {
            await usersDAO.injectDB(client)
            await projectsDAO.injectDB(client)
            await invoicesDAO.injectDB(client)
            next()
        })
        await fastify.listen(port)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    }).catch( err =>{
        fastify.log.error(err)
        process.exit(1)
    })
}

//Run server
start()