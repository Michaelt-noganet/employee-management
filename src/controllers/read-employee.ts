import { ReadService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'


const readService = new ReadService()
/**
 * Handles the reading of employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const readEmployees = (
    req: Request<any>,
    res: Response<any>,
) => {
    try {
        // Extract the IDs and page number from the query parameters
        const ids: string[] | any = req.query.ids || []
        const page: number | any = req.query.page || 1

        // Read the employees using the ReadService
        const response = readService.apply(
            METHODS.GET,
            undefined,
            ids,
            page,
        )

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json(err)
    }
}

/**
 * Handles finding employees.
 * @param req - The request object.
 * @param res - The response object.
 */
export const findEmployees = (
    req: Request<any>, res: Response<any>,
) => {
    try {
        // Extract the page number from the query parameters and the request body
        const page: number | any = req.query.page || 1
        const body: Record<string, any> = req.body

        // Find employees using the ReadService
        const response = readService.apply(
            METHODS.POST,
            body,
            undefined,
            page
            ,
        )

        // Send the response back to the client
        res.status(res.statusCode).json(response)
    } catch (err) {
        // If an error occurs, send the error response back to the client
        res.status(res.statusCode).json(err)
    }
}


