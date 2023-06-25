import { Employee } from '../employee'
import { HTTP_STATUS } from './http-status'
import { METHODS } from './methods'

export interface ApiResponse {
    status: HTTP_STATUS,
    action: METHODS,
    page?: string
    status_code?: number
    data?: Record<string, Employee>
    error?: any
}
