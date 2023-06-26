import { Employee } from '../types/employee'
import { PostService } from '../services'
import { Request, Response } from 'express'
import { METHODS } from '../types/api'

const postService = new PostService()

export const createEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const employee: Omit<Employee, 'id'> = req.body.employee
        const response = postService.apply(
            METHODS.POST,
            employee
            )
        res.status(res.statusCode).json(response)
    } catch (err) {
        res.status(res.statusCode).json(err)
    }
}
