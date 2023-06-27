import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import Sentry from '@sentry/node'
import helmet from 'helmet'
import logger from './middleware/production/winston'
import limiter from './middleware/production/limiter'
import specs from './middleware/swagger'
import v1Router from './routes/router-v1'


const app = express()

if (process.env.ENV === 'production') {
    app.use(helmet())

    app.use(bodyParser.json())

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
}

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs),
)

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
app.use(v1Router)

export default app
