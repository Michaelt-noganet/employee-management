import { employeeSchema } from '../models/schema/employee'
import { ApiResponse, METHODS } from '../models/api'
import { BaseEmployee, Employee } from '../models/employee'

export abstract class AbstractService {
    protected abstract get method(): METHODS
    protected abstract message(employeeFirstName?: string, employeeLastName?: string): string
    constructor() {}

    public apply(employee: Employee | BaseEmployee): ApiResponse {
        try {
            const message = this.message(employee.first_name, employee.last_name)
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
        try {
            const employee: Employee[] = employees.filter(employee => employee.id === id)
            if (!employee.length) {
                throw `Employee: ${ id } not found`
            }
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: employee.map(employee => employee.id),
                    employee: employee[0],
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
                    message: `Action failed: ${ error }`,
                    date: new Date()
                }
            }
        }
    }

    public deleteOne(employees: Employee[], id: string): ApiResponse {
        try {
            const index = employees.findIndex(employee => employee.id === id)
            if (index === -1) {
                throw `Employee: ${ id } not found`
            }
            employees.splice(index, 1)
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: [ id ],
                    message: this.message(id),
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'ERROR',
                action: this.method,
                data: {
                    employee_id: [ 'N/A' ],
                    message: `Action failed: ${ error}`,
                    date: new Date()
                }
            }
        }
    }

    public updateOne(employees: Employee[], id: string, update: Record<string, Employee>): ApiResponse {
        try {
            const employee: Employee[] = employees.filter(employee => employee.id === id)
            if (!employee.length) {
                throw `Employee: ${ id } not found`
            }
            const newEmployee: Employee = {
                ...employee[0],
                [Object.keys(update)[0]]: Object.values(update)[0]
            }
            const result = employeeSchema.validate(newEmployee)
            const { error } = result
            if (error) {
                throw `${ error.message }`
            }
            return {
                status: 'SUCCESS',
                action: this.method,
                data: {
                    employee_id: [ id ],
                    employee: result.value,
                    message: this.message(newEmployee.first_name, newEmployee.last_name),
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'ERROR',
                action: this.method,
                data: {
                    employee_id: [ 'N/A' ],
                    message: `Action failed: ${ error}`,
                    date: new Date()
                }
            }
        }
    }
}