import http from 'http'
import https from 'https'
import fs from 'fs'
import app from './app'

const options = {
    cert: fs.readFileSync('./security/certificate.pem'),
    key: fs.readFileSync('./security/private-key.pem'),
}

const env = process.env.ENV || 'dev'

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

if (env === 'production') {
    server = https.createServer(
        options,
        app,
    )
} else if (env === 'dev') {
    server = http.createServer(app)
}

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

server.listen(port)
