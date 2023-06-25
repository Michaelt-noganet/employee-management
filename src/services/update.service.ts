import { METHODS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees';
import { Employee } from '../types/employee';
import { employeeSchema } from '../schema/employee';



export class UpdateService extends AbstractService<{ input: {[key: string]: any }}> {
    protected method = METHODS.PUT
    protected statusCode: number;
    protected errorMessage?: string;
    protected applyOne(
        { input },
        id: string
    ): { success: boolean, data?: Record<string, Employee> }  {
        try {
            const employee = employees.find(employee => employee.id === id)
            if (!employee) {
                throw `Employee_id: ${ id } not found`
            }
            const newEmployee: Employee = {
                ...employee,
                [Object.keys(input)[0]]: Object.values(input)[0]
            }
            const result = employeeSchema.validate(newEmployee)
            const { error } = result
            if (error) {
                this.statusCode = 422
                throw error.message
            }
            return {
                success: true,
            }
        } catch (err) {
            this.errorMessage = err
            return {
                success: false
            }
        }
    }
}