import { METHODS } from '../types/api'
import { UpdateService } from '../services'
import { Request, Response } from 'express'

const updateService = new UpdateService()

export const updateEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const ids: string[] | any = req.query.ids
        const update: Record<string, any> = req.body
        const response = updateService.apply(
            METHODS.PATCH,
            update,
            ids
            )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}


