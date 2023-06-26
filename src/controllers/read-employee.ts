import { GetService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'
import { METHODS } from '../types/api'


const getService = new GetService()

export const readAllEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const ids: string[] | any = req.query.ids || []
        const page: number | any =req.query.page || 1
        const response = getService.apply(
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
        const response = getService.apply(
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


