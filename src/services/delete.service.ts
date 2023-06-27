import { employees } from '../fixtures/employees'
import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'


/**
 * Service class for delete employees.
 * Extends the AbstractService class.
 */
export class DeleteService extends AbstractService<object> {

    /**
   * Apply an action with request parameters.
   * This method is not implemented for CreateService.
   * @param _input -- The request body.
   * @param _ids - Array of IDs.
   * @param _page - Optional page number.
   * @throws Error - Method not implemented.
   */
    protected applyWithBody(
        _input: object, _ids: string[], _page?: number,
    ): GetResponse {
        throw new Error('Method not implemented.')
    }

    /**
 * Apply an action with request parameters.
 * Deletes the employees with the specified IDs from the employees array.
 * @param ids - An array of employee IDs to delete.
 * @returns The action response indicating the status of the operation.
 */
    protected applyWithParams(ids: string[]): ActionResponse  {
        try {
            ids.map(id => {
                // Find the index of the employee with the specified ID in the employees array
                const index: number = employees.findIndex(employee => employee.id === id)

                if (index !== -1) {
                    // Remove the employee from the employees array using the splice method
                    employees.splice(
                        index,
                        1,
                    )
                } else {
                    // Throw an exception if the employee with the specified ID is not found
                    throw 'Id not found'
                }
            })

            return {
                status: HTTP_STATUS.SUCCESS,
            }
        } catch (err) {
            // Return an error response if an exception occurs during the deletion process
            return {
                status: HTTP_STATUS.ERROR,
                error: err,
            }
        }
    }
}
