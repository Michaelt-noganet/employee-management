import { Employee } from '../types/employee'
import { employees } from '../fixtures/employees'
import { ApiResponse, METHODS } from '../types/api'
import { AbstractService } from './abstract.service'
import { v4 as uuidv4 } from 'uuid'
import { employeeSchema } from '../schema/employee'

export class PostService extends AbstractService<{
    employee: Omit<Employee, 'id'>
}> {
    protected method = METHODS.POST
    protected statusCode: number;
    protected errorMessage?: string;
    public applyOne(
        { employee }
    ): { success: boolean, data?: Record<string, Employee>} {
        try {
            const newEmployee: Employee = {
                id: uuidv4(),
                ...employee
            }

            const result = employeeSchema.validate(newEmployee)
            const { error } = result

            if (error.message) {
                this.statusCode = 422
                throw error.message
            }
            
            employees.push(newEmployee)

            return { 
                success: true,
                data: { [newEmployee.id]: newEmployee }
            }
        } catch (err) {
            this.errorMessage = err

            return {
                success: false
            }
        }
    }
}