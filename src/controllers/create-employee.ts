import { Employee } from '../types/employee'
import { CreateService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'

const createService = new CreateService()

export const createEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const employee: Omit<Employee, 'id'> = req.body.employee
        const response = createService.apply(
            METHODS.POST,
            employee
            )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}
