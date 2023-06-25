import { employeeSchema } from '../schema/employee'
import { Employee } from '../types/employee'
import { PostService } from '../services'
import { Request, Response } from 'express'

const postService = new PostService()

export const createEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const employee: Omit<Employee, 'id'> = req.body.employee
        console.log(employee)
        const response = postService.apply(
            { employee } 
            )
        res.status(response.status_code || res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}
