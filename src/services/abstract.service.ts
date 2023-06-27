import { GetResponse, METHODS, ActionResponse } from '../types/api'

/**
 * Abstract base class for implementing service classes.
 * Provides a unified interface for applying actions based on different HTTP methods.
 */
export abstract class AbstractService<TInput extends Record<string, any>> {

    /**
   * Apply an action with a request body.
   * @param input - The input data for the action.
   * @param ids - Optional array of IDs.
   * @param page - Optional page number.
   * @returns The action response.
   */
    protected abstract applyWithBody(
        input: TInput,
        ids?: string[],
        page?: number
    ): ActionResponse

    /**
   * Apply an action with request parameters.
   * @param ids - Array of IDs.
   * @param page - Optional page number.
   * @returns The action response or get response.
   */
    protected abstract applyWithParams(
        ids: string[],
        page?: number
    ): GetResponse | ActionResponse

    /**
   * Apply an action based on the specified method.
   * @param method - The HTTP method.
   * @param input - Optional input data for the action.
   * @param ids - Optional array of IDs.
   * @param page - Optional page number.
   * @returns The action response or get response.
   */
    public apply(
        method: METHODS,
        input?: TInput,
        ids?: string[],
        page?: number,
    ): GetResponse | ActionResponse {
        let response: GetResponse | ActionResponse = {} as GetResponse | ActionResponse
        switch (method) {
            case METHODS.GET:
            case METHODS.DELETE:
                response = this.applyWithParams(
                    ids,
                    page,
                )
                break
            case METHODS.PATCH:
            case METHODS.POST:
            case METHODS.PUT:
                response = this.applyWithBody(
                    input,
                    ids,
                    page,
                )
                break
        }

        return response
    }
}
