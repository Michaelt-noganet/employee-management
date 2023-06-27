import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'
import { Employee } from '../types/employee'
import { employeeSchema } from '../schema/employee'


/**
 * Service class for update some employees.
 * Extends the AbstractService class.
 */
export class UpdateService extends AbstractService<object> {

    /**
 * Apply an action with request parameters.
 * This method is not implemented for the UpdateService class.
 * @param _ids - An array of employee IDs (not used in this method).
 * @param _page - The page number for pagination (not used in this method).
 * @returns An error indicating that the method is not implemented.
 */
    protected applyWithParams(
        _ids: string[], _page?: number,
    ): GetResponse | ActionResponse {
        throw new Error('Method not implemented.')
    }

    /**
 * Apply an action with a request body.
 * Updates the specified employees with the provided data.
 * @param input - The request body containing the data to update the employees.
 * @param ids - An array of employee IDs to update.
 * @returns The ActionResponse indicating the success or failure of the update operation.
 */
    protected applyWithBody(
        input: {[key: string]: any },
        ids: string[],
    ): ActionResponse  {
        try {
            ids.map(id => {
                // Find the employee with the specified ID
                const employee = employees.find(employee => employee.id === id)
                if (!employee) {
                    throw `Employee_id: ${ id } not found`
                }

                // Extract the key-value pair from the input object
                const [key, value] = Object.entries(input)[0]

                // Create a new employee object with the updated value
                const newEmployee: Employee = {
                    ...employee,
                    [key]: value,
                }

                // Validate the updated employee data
                const result = employeeSchema.validate(newEmployee)
                const { error } = result
                if (error) {
                    throw error.message
                }
            })

            return {
                status: HTTP_STATUS.SUCCESS,
            }
        } catch (err) {
            // Return an error response if an exception occurs
            return {
                status: HTTP_STATUS.ERROR,
                error: err,
            }
        }
    }
}
