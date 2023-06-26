import express from 'express'
import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import winston from 'winston'
import morgan from 'morgan'
import Sentry from '@sentry/node'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import router from './routes/router'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

const app = express()

app.use(helmet())

app.use(bodyParser.json())

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use((
    req, _res, next,
) => {
    logger.info(`${ req.method } ${ req.url }`)
    next
})

app.use(morgan('combined'))

app.use((
    err: any, _req, res: any, _next,
) => {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
})

Sentry.init({ dsn: 'your-sentry-dsn' })

app.use(Sentry.Handlers.errorHandler())

// healthcheck
app.get(
    '/healthcheck',
    (
        _req, res,
    ) => {
        try {
            const timestamp = new Date()
            const response = {
                success: 'OK',
                data: {
                    message: 'OK',
                    timestamp,
                    date: timestamp.toUTCString(),
                    version: process.env.DOCKER_IMAGE_VERSION || 'N/A',
                },
            }
            res.status(200).json(response)
        } catch (err) {
            const response = {
                success: false,
                data: {
                    message: err,
                    version: process.env.DOCKER_IMAGE_VERSION || 'N/A',
                },
            }
            res.status(res.statusCode).json(response)
        }
    },
)

// CRUD logic is in the router
app.use(router)

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'LogRocket Express API with Swagger',
            version: '0.1.0',
            description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(options)

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs),
)


export default app
