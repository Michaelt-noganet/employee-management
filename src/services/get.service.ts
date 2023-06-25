import { Employee } from '../types/employee'
import { METHODS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'

const PAGE_SIZE = 10

export class GetService extends AbstractService<{
    input:  Record<string, any>,
}> {
    protected method = METHODS.GET
    protected statusCode: number;
    protected errorMessage?: string;

    protected applyOne(
        { input }: { input: {}},
        _id: string,
        page: number
    ): { success: boolean, data?: Record<string, Employee>, page?: string} {
        const result: Record<string, Employee> = {}
        const start: number = (page - 1) * PAGE_SIZE
        const end: number = start + PAGE_SIZE
        let filteredEmployee: Employee[] = employees
        try {
            if (Object.keys(input).length) {
                
                const [key, value] = Object.entries(input)[0]
                filteredEmployee = employees.filter(employee => employee[key] === value)
            }

            const totalFilteredEmployee: number = filteredEmployee.length
            const totalPages = Math.ceil(totalFilteredEmployee / PAGE_SIZE)

            const paginatedEmployees = filteredEmployee.slice(start, end)

            paginatedEmployees.forEach(employee => {
                    result[employee.id] = employee
                })

            return {
                success: true,
                data: result,
                page: `${ page} / ${ totalPages}`
            }
        } catch (err) {
            this.errorMessage = err
            return {
                success: false
            }
        }
    }




    
}