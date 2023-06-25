import { HTTP_STATUS } from '../types/api/http-status'
import { ApiResponse, METHODS } from '../types/api'
import { Employee } from '../types/employee'

export abstract class AbstractService<TInput extends Record<string, any>, TEntity extends string[] = []> {
    protected abstract method: METHODS
    protected abstract statusCode?: number
    protected abstract errorMessage?: any
    protected abstract applyOne(
        input?: TInput,
        id?: string,
        page?: number
        ): { success: boolean, data?: Record<string, Employee>, page?: string}
    
    constructor() {}

    public apply(
        input?: TInput,
        ids?: TEntity,
        page?: number
    ): ApiResponse {
        let response: ApiResponse = {} as ApiResponse
        try {
            if (!ids || !ids.length) {
                const resultApplyOne = this.applyOne(
                    input,
                    undefined,
                    page
                    )
                response = {
                    status: resultApplyOne.success ? HTTP_STATUS.SUCCESS : HTTP_STATUS.ERROR,
                    status_code: this.statusCode,
                    page: resultApplyOne.page,
                    action: this.method,
                    data: resultApplyOne.data,
                    error: this.errorMessage
                }

                return response
            }

            ids.map(id => {
                const resultApplyOne = this.applyOne(
                    input,
                    id,
                    page
                    )
                    response = {
                        status: resultApplyOne.success ? HTTP_STATUS.SUCCESS : HTTP_STATUS.ERROR,
                        status_code: this.statusCode,
                        action: this.method,
                        data: resultApplyOne.data,
                        error: this.errorMessage
                    }
                })

            return response
        } catch (error) {
            response = {
                status: HTTP_STATUS.ERROR,
                status_code: this.statusCode,
                action: this.method,
                error
            }
        }
    }
}