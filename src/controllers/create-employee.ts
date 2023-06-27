import { Employee } from '../types/employee'
import { CreateService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'


const createService = new CreateService()

/**
 * Handles the creation of an employee.
 * @param req - The request object.
 * @param res - The response object.
 */
export const createEmployee = (
    req: Request<any>,
    res: Response<any>,
) => {
    try {
        // Extract the employee object from the request body
        const employee: Omit<Employee, 'id'> = req.body.employee

        // Create a new employee using the CreateService
        const response = createService.apply(
            METHODS.POST,
            employee,
        )

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json(err)
    }
}
