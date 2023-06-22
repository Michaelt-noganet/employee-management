import { Employee } from '../employee'
import { METHODS } from './methods'

export interface ApiResponse {
    status: string,
    action: METHODS
    data: {
        employee_id: string[],
        message: string,
        date: Date,
        employee?: Employee
        employees?: Employee[]
        error?: any
    }
}