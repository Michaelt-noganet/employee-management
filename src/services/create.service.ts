import { Employee } from '../types/employee'
import { employees } from '../fixtures/employees'
import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { v4 as uuidv4 } from 'uuid'
import { employeeSchema } from '../schema/employee'

export class CreateService extends AbstractService<{}> {
    protected applyWithParams(ids: string[], page?: number): ActionResponse | GetResponse {
        throw new Error('Method not implemented.')
    }

    public applyWithBody(
        employee: Omit<Employee, 'id'>
    ): ActionResponse {
        try {
            const newEmployee: Employee = {
                id: uuidv4(),
                ...employee
            }

            const result = employeeSchema.validate(newEmployee)
            const { error } = result

            if (error && error.message) {
                throw error.message
            }
            
            employees.push(newEmployee)

            return { 
                status: HTTP_STATUS.SUCCESS,
            }
        } catch (err) {

            return {
                status: HTTP_STATUS.ERROR,
                error: err
            }
        }
    }
}