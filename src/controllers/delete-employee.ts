import { DeleteService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'


const deleteService = new DeleteService()

/**
 * Handles the deletion of employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const deleteEmployees = (
    req: Request<any>,
    res: Response<any>,
) => {
    try {
        // Extract the IDs from the query parameters
        const ids: string[] | any = req.query.ids

        // Delete the employees using the DeleteService
        const response = deleteService.apply(
            METHODS.DELETE,
            {},
            ids,
        )

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json(err)
    }
}


