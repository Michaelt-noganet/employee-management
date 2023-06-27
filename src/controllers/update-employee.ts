import { METHODS } from '../types/api'
import { UpdateService } from '../services'
import { Request, Response } from 'express'


const updateService = new UpdateService()

/**
 * Handles the update of employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateEmployees = (
    req: Request<any>, res: Response<any>,
) => {
    try {
        // Extract the IDs and update data from the query parameters and request body
        const ids: string[] | any = req.query.ids
        const update: Record<string, any> = req.body

        // Update the employees using the UpdateService
        const response = updateService.apply(
            METHODS.PATCH,
            update,
            ids,
        )

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json(err)
    }
}
