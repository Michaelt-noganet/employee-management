import { ApiResponse, METHODS } from '../models/api'
import { BaseEmployee, Employee } from '../models/employee'

export abstract class AbstractService {
    protected abstract get method(): METHODS
    protected abstract message(employeeFirstName: string, employeeLastName: string): string
    constructor() {}

    public apiAction(employee: Employee | BaseEmployee): ApiResponse {
        const message = this.message(employee.first_name, employee.last_name)
        try {
            return {
                status: 'success',
                action: this.method,
                data: {
                    employee_id: employee.id,
                    message: message,
                    date: new Date()
                }
            }
        } catch (error) {
            return {
                status: 'Error',
                action: this.method,
                data: {
                    employee_id: employee.id || 'N/A',
                    message: 'Action failed',
                    date: new Date()
                }
            }
        }
    }

    public apiGet() {

    }
}