import { Employee } from '../types/employee'
import { CreateService } from '../services'
import { Request, Response } from 'express'
import { ApiResponse, HTTP_STATUS, METHODS } from '../types/api'


const createService = new CreateService()

/**
 * Handles the creation of an employee.
 * @param req - The request object.
 * @param res - The response object.
 */
export const createEmployee = (
    req: Request<object, any, { employee: Omit<Employee, 'id'> }>,
    res: Response<ApiResponse>,
) => {
    try {
        // Extract the employee object from the request body
        const employee = req.body.employee

        // Create a new employee using the CreateService
        const response = createService.apply({ employee })

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
