import { ReadService } from '../services'
import { Request, Response } from 'express'
import { ApiResponse, HTTP_STATUS, METHODS } from '../types/api'
import { Employee } from '../types/employee'


const readService = new ReadService()
/**
 * Handles the reading of employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const readEmployees = (
    req: Request<object, any, object, { ids: string[], page?: string}>,
    res: Response<ApiResponse>,
) => {
    try {
        // Extract the IDs and page number from the query parameters
        const ids = req.query.ids || []
        const page = parseInt(req.query.page) || 1

        // Read the employees using the ReadService
        const response = readService.apply({
            parameters: {},
            ids,
            page,
        })

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json({
            status: HTTP_STATUS.ERROR,
            data: {},
            error: err,
        })
    }
}

/**
 * Handles finding employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const findEmployees = (
    req: Request<object, any, Record<string, Partial<Employee>>, { page?: string}>,
    res: Response<ApiResponse>,
) => {
    try {
        // Extract the page number from the query parameters and the request body
        const page = parseInt(req.query.page) || 1
        const parameters = req.body

        // Find employees using the ReadService
        const response = readService.apply({
            parameters,
            ids: [],
            page,
        })

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json({
            status: HTTP_STATUS.ERROR,
            data: {},
            error: err,
        })
    }
}


