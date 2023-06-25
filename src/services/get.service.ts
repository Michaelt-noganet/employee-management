import { Employee } from 'src/types/employee'
import { METHODS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'

export class GetService extends AbstractService<{}> {
    protected method = METHODS.GET
    protected statusCode: number;
    protected errorMessage?: string;

    protected applyOne(
        input: Record<string, any>,
    ): { success: boolean, data?: Record<string, Employee>} {
        const result: Record<string, Employee> = {}
        try {
            if (input) {
                const employee = employees.filter(employee => employee[Object.keys(input)[0]] === Object.values(input)[0])
                employee.forEach(employee => {
                    result[employee.id] = employee
                })
            } else {
                employees.forEach(employee => {
                    result[employee.id] = employee
                })
            }
            return {
                success: true,
                data: result
            }
        } catch (err) {
            this.errorMessage = err
            return {
                success: false
            }
        }
    }




    
}