import winston from 'winston'

/**
 * Logger instance for logging application events.
 */
const logger = winston.createLogger({
    level: 'info', // Set the log level to 'info'
    format: winston.format.json(), // Use JSON format for log messages
    transports: [
        new winston.transports.File({
            filename: 'error.log', // Store error logs in 'error.log' file
            level: 'error', // Set the log level for this transport to 'error'
        }),
        new winston.transports.File({ filename: 'combined.log' }), // Store all logs in 'combined.log' file
    ],
})

export default logger
