import { GetService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'


const getService = new GetService()

export const readAllEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const page: number = parseInt(req.params.page) || 1
        const response = getService.apply(
            { input: {}} ,
            undefined,
            page
            )
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}

export const selectEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const page: number = parseInt(req.params.page) || 1
        const body: Record<string, any> = req.body
        const response = getService.apply(
            { input: body },
            undefined,
            page
            )
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}


