import { HTTP_STATUS } from '../types/api/http-status'
import { ApiResponse, METHODS } from '../types/api'
import { Employee } from '../types/employee'

export abstract class AbstractService<TInput extends Record<string, any> = {}, TEntity extends string[] = [] > {
    protected abstract method: METHODS
    protected abstract statusCode?: number
    protected abstract errorMessage?: any
    protected abstract applyOne(
        input?: TInput,
        id?: string,
        ): { success: boolean, data?: Record<string, Employee>}
    
    constructor() {}

    public apply(
        input?: TInput,
        ids?: TEntity
    ): ApiResponse {
        let response: ApiResponse = {} as ApiResponse
        if (!ids) {
            try {
                const resultApplyOne = this.applyOne(input)
                response = {
                    status: resultApplyOne.success ? HTTP_STATUS.SUCCESS : HTTP_STATUS.ERROR,
                    status_code: this.statusCode,
                    action: this.method,
                    data: resultApplyOne.data,
                    error: this.errorMessage
                }
            } catch (error) {
                response = {
                    status:  HTTP_STATUS.ERROR,
                    status_code: this.statusCode,
                    action: this.method,
                    error
                }
            }

            return response
        }
        ids.map(id => {
            try {
                const resultApplyOne = this.applyOne(input, id)
                    response = {
                        status: resultApplyOne.success ? HTTP_STATUS.SUCCESS : HTTP_STATUS.ERROR,
                        status_code: this.statusCode,
                        action: this.method,
                        data: resultApplyOne.data,
                        error: this.errorMessage
                    }
            } catch (error) {
                response = {
                    status: HTTP_STATUS.ERROR,
                    status_code: this.statusCode,
                    action: this.method,
                    error
                }
            }
        })

        return response
    }
}