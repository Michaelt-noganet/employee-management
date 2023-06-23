import { DeleteService } from '../services'
import { Request, Response } from 'express'
import { employees } from '../fixtures/employees'


const deleteService = new DeleteService()

export const deleteOneEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const id: string = req.params.id
        const response = deleteService.deleteOne(employees, id)
        res.status(201).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to display the employee')
    }
}


