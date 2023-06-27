import rateLimit from 'express-rate-limit'

/**
 * Rate limiter middleware to limit incoming requests.
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})

export default limiter
