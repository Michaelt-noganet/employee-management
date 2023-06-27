import { Employee } from '../types/employee'
import { ApiResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'

const PAGE_SIZE = 10

/**
 * Service class for read or select some employees.
 * Extends the AbstractService class.
 */
export class ReadService extends AbstractService<{
    parameters: Record<string, Partial<Employee>>,
    ids: string[],
    page: number,
}> {
    public pagination(
        input: any[], page: number,
    ): any[] {
        const start: number = (page - 1) * PAGE_SIZE
        const end: number = start + PAGE_SIZE

        return input.slice(
            start,
            end,
        )
    }

    /**
 * Retrieves the employees based on the specified filters in the request body and returns a paginated response.
 * @param input - The request body containing the filters.
 * @param page - The page number for pagination.
 * @returns The GetResponse containing the filtered and paginated employee data.
 */
    protected applyAction(input: {
        parameters: Record<string, Partial<Employee>>,
        ids: string[],
        page: number,
    }): ApiResponse {
        const result: Record<string, Employee> = {}
        const page = input.page
        let totalPages = 0
        let paginatedEmployees: Employee[] = this.pagination(
            employees,
            input.page,
        )
        let filteredEmployees: Employee[] = []

        if (Object.keys(input.parameters).length && !Object.keys(input.ids).length) {
            // Extract the key-value pair from the input object
            const [key, value] = Object.entries(input.parameters)[0]

            // Filter the employees array based on the specified key-value pair
            filteredEmployees = employees.filter(employee => employee[key] === value)

            // Paginate the filtered employees array
            paginatedEmployees = this.pagination(
                filteredEmployees,
                page,
            )

            // Calculate the total number of pages based on the filtered and paginated employee data
            totalPages = Math.ceil(paginatedEmployees.length / PAGE_SIZE)

            // Populate the result object with the paginated employee data
            paginatedEmployees.forEach(employee => {
                result[employee.id] = employee
            })
        }

        if (input.ids.length && !Object.keys(input.parameters).length) {
            input.ids.map(id => {
                // Filter the employees array based on the specified ID
                filteredEmployees = employees.filter(employee => employee.id === id)

                // Calculate the total number of pages based on the filtered employee data
                totalPages =  Math.ceil(filteredEmployees.length / PAGE_SIZE)

                // Paginate the filtered employees array
                paginatedEmployees = this.pagination(
                    filteredEmployees,
                    page,
                )

                // Find the employee with the specified ID from the paginated employees
                result[id] = paginatedEmployees.find(employee => employee.id === id)
            })
        } else {
            // Populate the result object with the paginated employee data
            paginatedEmployees.forEach(employee => {
                result[employee.id] = employee
            })
            totalPages = Math.ceil(paginatedEmployees.length / PAGE_SIZE)
        }


        return {
            status: HTTP_STATUS.SUCCESS,
            data: result,
            meta: {
                page,
                totalPages,
            },
        }
    }
}
