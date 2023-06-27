import { employees } from '../fixtures/employees'
import { ApiResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'


/**
 * Service class for delete employees.
 * Extends the AbstractService class.
 */
export class DeleteService extends AbstractService<{
    ids: string[],
}> {

    /**
 * Deletes the employees with the specified IDs from the employees array.
 * @param ids - An array of employee IDs to delete.
 * @returns The action response indicating the status of the operation.
 */
    protected applyAction(input: {ids: string[]}): ApiResponse  {
        input.ids.map(id => {
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
    }
}
