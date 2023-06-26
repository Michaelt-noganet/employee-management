import { Employee } from '../employee'
import { HTTP_STATUS } from './http-status'

export interface GetResponse {
    status: HTTP_STATUS,
    data: Record<string, Employee>,
    page: string,
    error?: any,
}

export interface ActionResponse {
    status: HTTP_STATUS,
    error?: any,
}
