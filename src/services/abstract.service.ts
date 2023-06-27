import { ApiResponse, HTTP_STATUS } from '../types/api'

/**
 * Abstract base class for implementing service classes.
 * Provides a unified interface for applying actions based on different HTTP methods.
 */
export abstract class AbstractService<TInput extends Record<string, any>> {


    /**
   * Apply an action with input parameters.
   * @param input - The input data for the action.
   * @param page - Optional page number.
   * @returns The api standard response.
   */
    protected abstract applyAction(
        input: TInput,
        page?: number
    ): ApiResponse

    /**
   * Apply an action based on the specified method.
   * @param input - Input data for the action.
   * @param page - Optional page number.
   * @returns The api standard response.
   */
    public apply(
        input: TInput,
        page?: number,
    ): ApiResponse  {
        // TODO: implement access token validation logic
        try {
            return this.applyAction(
                input,
                page,
            )
        } catch (err) {
            return {
                status: HTTP_STATUS.ERROR,
                error: err,
            }
        }
    }
}
