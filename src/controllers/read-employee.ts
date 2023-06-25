import { GetService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'


const getService = new GetService()

export const readAllEmployee = (_req: Request<any>, res: Response<any>) => {
    try {
        const response = getService.apply()
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}

export const selectEmployees = (req: Request<any>, res: Response<any>) => {
    try {
        const body: string[] | any = req.body
        const response = getService.apply(body)
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}


