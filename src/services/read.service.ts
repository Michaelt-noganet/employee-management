import { Employee } from '../types/employee'
import { GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'

const PAGE_SIZE = 10

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

    protected applyWithBody(
        input: object, _ids: string[], page: number,
    ): GetResponse {
        const result: Record<string, Employee> = {}
        let totalPages = 0

        try {
            if (Object.keys(input).length) {
                const [key, value] = Object.entries(input)[0]
                const filteredEmployees = employees.filter(employee => employee[key] === value)

                const paginatedEmployees = this.pagination(
                    filteredEmployees,
                    page,
                )
                totalPages = Math.ceil(paginatedEmployees.length / PAGE_SIZE)

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
            return {
                status: HTTP_STATUS.ERROR,
                data: {},
                page: 'N/A',
                error: JSON.stringify(err),
            }
        }
    }

    protected applyWithParams(
        ids: string[], page?: number,
    ): GetResponse {
        try {
            const result: Record<string, Employee> = {}
            let totalPages = Math.ceil(employees.length / PAGE_SIZE)
            const paginatedEmployees =  this.pagination(
                employees,
                page,
            )
            if (ids.length) {
                ids.map(id => {
                    const filteredEmployees = employees.filter(employee => employee.id === id)
                    totalPages =  Math.ceil(filteredEmployees.length / PAGE_SIZE)
                    const paginatedEmployees = this.pagination(
                        filteredEmployees,
                        page,
                    )
                    result[id] = paginatedEmployees.find(employee => employee.id === id)
                })
            } else {
                console.log(2)
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

            return {
                status: HTTP_STATUS.ERROR,
                data: {},
                page: 'N/A',
                error: err,
            }
        }
    }
}
