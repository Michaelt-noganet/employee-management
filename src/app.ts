import express from 'express'

const app = express()

app.get('/healthcheck', (req, res, next) => {
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
})

export default app