import express from 'express'
import bodyParser from 'body-parser'
import { Employee } from './models/employee'
import { registerEmployee } from './controllers'
import { employeeSchema } from './models/schema/employee'

const app = express()

app.use(bodyParser.json())

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

app.post('/employee', (req, res) => {
    try {
        const employee: Omit<Employee, 'id'> = req.body.employee
        const result = employeeSchema.validate(employee)
        const { value, error } = result
        if (error) {
            res.status(422).json(error.message)
        }
        const response = registerEmployee(value)
        res.status(201).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to register the employee')
    }
})

export default app