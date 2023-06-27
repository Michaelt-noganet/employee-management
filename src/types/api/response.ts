import { Employee } from '../employee'
import { HTTP_STATUS } from './http-status'

export interface ApiResponse {
    status: HTTP_STATUS,
    data?: Record<string, Employee>,
    meta?: {
        page: number,
        totalPages: number,
    },
    error?: any,
}
