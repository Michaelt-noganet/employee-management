import { GetService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'


const getService = new GetService()

export const readAllEmployee = (_req: Request<any>, res: Response<any>) => {
    try {
        const response = getService.getAll(employees)
        res.status(200).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to display employees')
    }
}

export const readOneEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const id: string = req.params.id
        const response = getService.getOne(employees, id)
        res.status(200).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to display the employee')
    }
}


