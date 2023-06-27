import http from 'http'
import https from 'https'
import fs from 'fs'
import app from './app'

const urlMapping: { [Key: string]: string } = {
    integration: `https://${ process.env.INTEGRATION_URL }`,
    staging: `https://${ process.env.STAGING_URL }`,
    production: `https://${ process.env.PRODUCTION_URL }`,
}

// Determine the environment
const env = process.env.ENV || 'dev'

// Normalize the port value
const normalizePort = (val: string) => {
    const port = parseInt(
        val,
        10,
    )

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }

    return false
}

const port = normalizePort(process.env.PORT || '3000')
app.set(
    'port',
    port,
)

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | https.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

// Create the HTTP or HTTPS server based on the environment
if (env === 'production') {
    // Read the SSL certificate and private key from files
    const options = {
        cert: fs.readFileSync('./security/certificate.pem'),
        key: fs.readFileSync('./security/private-key.pem'),
    }
    // Start the server in production
    server = https.createServer(
        options,
        app,
    ).listen(
        parseInt(process.env.PORT),
        urlMapping[process.env.ENV],
    )
} else if (env === 'dev') {
    // Start the server in developement
    server = http.createServer(app).listen(port)
}

// Error handler function for the server
const errorHandler = (error: any) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${  address }` : `port: ${  port }`
    switch (error.code) {
        case 'EACCES':
            console.error(`${ bind  } requires elevated privileges.`)
            process.exit(1)
        case 'EADDRINUSE':
            console.error(`${ bind  } is already in use.`)
            process.exit(1)
        default:
            throw error
    }
}

// Event listeners for the server
server.on(
    'error',
    errorHandler,
)
server.on(
    'listening',
    () => {
        const address = server.address()
        const bind = typeof address === 'string' ? `pipe ${  address }` : `port ${  port }`
        console.log(`Listening on ${  bind }`)
    },
)
