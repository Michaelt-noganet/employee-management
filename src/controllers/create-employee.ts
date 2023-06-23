import { employeeSchema } from '../models/schema/employee'
import { Employee } from '../models/employee'
import { PostService } from '../services'
import { Request, Response } from 'express'

const postService = new PostService()

export const formatId = (employeeFirstName: string, employeeLastName: string): string => {
    return `${ employeeFirstName.toLowerCase() }${ employeeLastName[0].toLowerCase() }`
}

export const createEmployee = (req: Request<any>, res: Response<any>) => {
    try {
        const employee: Omit<Employee, 'id'> = req.body.employee
        const id = formatId(employee.first_name, employee.last_name)
        const employeeWithId: Employee = {
            id,
            ...employee
        }
        const result = employeeSchema.validate(employeeWithId)
        const { error } = result
        if (error) {
            res.status(422).json(error.message)
        }
        const response = postService.apply(employeeWithId)
        res.status(201).json(response)
    } catch (err) {
        res.status(res.statusCode).json('Failed to register the employee')
    }
}
