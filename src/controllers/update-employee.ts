import { UpdateService } from '../services'
import { Request, Response } from 'express'

const updateService = new UpdateService()

export const updateOneEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const ids: string[] | any = req.query.ids
        const update: Record<string, any> = req.body
        const response = updateService.apply(
            { input: update },
            ids
            )
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}


