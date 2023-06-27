import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import Sentry from '@sentry/node'
import helmet from 'helmet'
import logger from './middleware/production/winston'
import limiter from './middleware/production/limiter'
import v1Router from './routes/router-v1'


const app = express()

// Parse JSON request bodies
app.use(bodyParser.json())

// Middleware and configurations for production environment
if (process.env.ENV === 'production') {
    // Enable helmet for security headers
    app.use(helmet())

    // Rate limiter middleware to limit incoming requests
    app.use(limiter)

    // Logging middleware
    app.use((
        req, _res, next,
    ) => {
        logger.info(`${ req.method } ${ req.url }`)
        next
    })

    // Morgan logging middleware for combined log format
    app.use(morgan('combined'))

    // Error handling middleware
    app.use((
        err: any, _req, res: any, _next,
    ) => {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    })

    // Initialize Sentry for error tracking
    Sentry.init({ dsn: 'your-sentry-dsn' })

    // Error handler middleware for Sentry
    app.use(Sentry.Handlers.errorHandler())
}

// Health check endpoint
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

// Mount the router for CRUD logic
app.use(
    '/v1',
    v1Router,
)

export default app
