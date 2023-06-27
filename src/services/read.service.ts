import { Employee } from '../types/employee'
import { GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'

const PAGE_SIZE = 10

/**
 * Service class for read or select some employees.
 * Extends the AbstractService class.
 */
export class ReadService extends AbstractService<object> {
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
 * Apply an action with a request body.
 * Retrieves the employees based on the specified filters in the request body and returns a paginated response.
 * @param input - The request body containing the filters.
 * @param _ids - An array of employee IDs (not used in this method).
 * @param page - The page number for pagination.
 * @returns The GetResponse containing the filtered and paginated employee data.
 */
    protected applyWithBody(
        input: object, _ids: string[], page: number,
    ): GetResponse {
        const result: Record<string, Employee> = {}
        let totalPages = 0

        try {
            if (Object.keys(input).length) {
                // Extract the key-value pair from the input object
                const [key, value] = Object.entries(input)[0]

                // Filter the employees array based on the specified key-value pair
                const filteredEmployees = employees.filter(employee => employee[key] === value)

                // Paginate the filtered employees array
                const paginatedEmployees = this.pagination(
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

            return {
                status: HTTP_STATUS.SUCCESS,
                data: result,
                page: `${ page } / ${ totalPages }`,
            }

        } catch (err) {
            // Return an error response if an exception occurs during the data retrieval process
            return {
                status: HTTP_STATUS.ERROR,
                data: {},
                page: 'N/A',
                error: JSON.stringify(err),
            }
        }
    }

    /**
 * Apply an action with request parameters.
 * Retrieves the employees based on the specified IDs and returns a paginated response.
 * @param ids - An array of employee IDs.
 * @param page - The page number for pagination.
 * @returns The GetResponse containing the filtered and paginated employee data.
 */
    protected applyWithParams(
        ids: string[], page?: number,
    ): GetResponse {
        try {
            const result: Record<string, Employee> = {}
            let totalPages = Math.ceil(employees.length / PAGE_SIZE)

            // Paginate the employees array
            const paginatedEmployees =  this.pagination(
                employees,
                page,
            )
            if (ids.length) {
                ids.map(id => {
                    // Filter the employees array based on the specified ID
                    const filteredEmployees = employees.filter(employee => employee.id === id)

                    // Calculate the total number of pages based on the filtered employee data
                    totalPages =  Math.ceil(filteredEmployees.length / PAGE_SIZE)

                    // Paginate the filtered employees array
                    const paginatedEmployees = this.pagination(
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
            }

            return {
                status: HTTP_STATUS.SUCCESS,
                data: result,
                page: `${ page } / ${ totalPages }`,
            }
        } catch (err) {
            // Return an error response if an exception occurs during the data retrieval process
            return {
                status: HTTP_STATUS.ERROR,
                data: {},
                page: 'N/A',
                error: err,
            }
        }
    }
}
