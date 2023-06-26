import { GetResponse, METHODS, ActionResponse } from '../types/api'

export abstract class AbstractService<TInput extends Record<string, any>> {

    protected abstract applyWithBody(
        input: TInput,
        ids?: string[],
        page?: number
        ): ActionResponse

    protected abstract applyWithParams(
        ids: string[],
        page?: number
    ): GetResponse | ActionResponse // ActionResponse for DELETE
    
    constructor() {}

    public apply(
        method: METHODS,
        input?: TInput,
        ids?: string[],
        page?: number
    ): GetResponse | ActionResponse {
        let response: GetResponse | ActionResponse = {} as GetResponse | ActionResponse
        switch (method) {
            case METHODS.GET:
            case METHODS.DELETE:
                response = this.applyWithParams(
                    ids,
                    page
                )
                break
            case METHODS.PATCH:
            case METHODS.POST:
            case METHODS.PUT:
                response = this.applyWithBody(
                    input,
                    ids,
                    page
                )
                break
        }

        return response
    }
}