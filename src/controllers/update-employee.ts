import { ApiResponse, HTTP_STATUS, METHODS } from '../types/api'
import { UpdateService } from '../services'
import { Request, Response } from 'express'
import { Employee } from '../types/employee'


const updateService = new UpdateService()

/**
 * Handles the update of employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateEmployees = (
    req: Request<object, any, Record<string, Partial<Employee>>>,
    res: Response<ApiResponse>,
) => {
    try {
        // Extract the IDs and update data from the query parameters and request body
        const entities = req.body

        // Update the employees using the UpdateService
        const response = updateService.apply({
            entities,
        })

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json({
            status: HTTP_STATUS.ERROR,
            error: err,
        })
    }
}
