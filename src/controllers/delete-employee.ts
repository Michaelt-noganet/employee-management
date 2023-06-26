import { DeleteService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'


const deleteService = new DeleteService()

export const deleteEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const ids: string[] | any = req.query.ids
        const response = deleteService.apply(
            METHODS.DELETE,
            {},
            ids
        )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to display the employee')
    }
}


