import { ReadService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'


const readService = new ReadService()

export const readEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const ids: string[] | any = req.query.ids || []
        const page: number | any =req.query.page || 1
        const response = readService.apply(
            METHODS.GET,
            undefined,
            ids,
            page
            )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}

export const findEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const page: number | any = req.query.page || 1
        const body: Record<string, any> = req.body
        const response = readService.apply(
            METHODS.POST,
            body,
            undefined,
            page
            )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}


