import { ApiResponse, METHODS } from '../models/api'
import { BaseEmployee, Employee } from '../models/employee'

export abstract class AbstractService {
    protected abstract get method(): METHODS
    protected abstract message(employeeFirstName?: string, employeeLastName?: string): string
    constructor() {}

    public apply(employee: Employee | BaseEmployee): ApiResponse {
        const message = this.message(employee.first_name, employee.last_name)
        try {
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: [ employee.id ],
                    message: message,
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'ERROR',
                action: this.method,
                data: {
                    employee_id: [ employee.id ] || [ 'N/A' ],
                    message: 'Action failed',
                    date: new Date()
                }
            }
        }
    }

    public getAll(employees: Employee[]): ApiResponse {
        try {
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: employees.map(employee => employee.id),
                    employees: employees,
                    message: this.message(),
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'ERROR',
                action: this.method,
                data: {
                    employee_id: [ 'N/A' ],
                    message: 'Action failed',
                    date: new Date()
                }
            }
        }
    }

    public getOne(employees: Employee[], id: string): ApiResponse {
        const employee: Employee[] = employees.filter(employee => employee.id === id)
        try {
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: !!employee.length ? employee.map(employee => employee.id) : [ id ],
                    employee: employee[0],
                    message: !!employee.length ? this.message() : `Employee: ${ id } not found`,
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'ERROR',
                action: this.method,
                data: {
                    employee_id: [ 'N/A' ],
                    message: 'Action failed',
                    date: new Date()
                }
            }
        }
    }
}