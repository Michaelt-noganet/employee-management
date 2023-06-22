import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router'

const app = express()

app.use(bodyParser.json())

// healthcheck
app.get('/healthcheck', (_req, res) => {
    try {
        const hrend = process.hrtime()
        const timestamp = new Date()
        const responseTimeInSeconds = Number(hrend[0] + (hrend[1] / Math.pow(
            10,
            9,
        ))).toFixed(3)
        
        const response = {
            success: 'OK',
            data: {
                upTimeInSeconds: process.uptime().toFixed(3),
                responseTimeInSeconds,
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
                upTimeInSeconds: process.uptime().toFixed(3),
                message: err,
                version: process.env.DOCKER_IMAGE_VERSION || 'N/A',
            }
        }
        res.status(res.statusCode).json(response)
    }
})

// CRUD logic is in the router
app.use(router)

export default app