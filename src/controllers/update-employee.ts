import { UpdateService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'
import { Employee } from 'src/models/employee'


const updateService = new UpdateService()

export const updateOneEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const id: string = req.body.id
        const update: Record<string, Employee> = req.body.update
        const response = updateService.updateOne(employees, id, update)
        res.status(200).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to display the employee')
    }
}


