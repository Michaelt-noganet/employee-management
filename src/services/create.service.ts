import { Employee } from '../types/employee'
import { employees } from '../fixtures/employees'
import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { v4 as uuidv4 } from 'uuid'
import { employeeSchema } from '../schema/employee'

/**
 * Service class for creating an employee.
 * Extends the AbstractService class.
 */
export class CreateService extends AbstractService<object> {

    /**
   * Apply an action with request parameters.
   * This method is not implemented for CreateService.
   * @param _ids - Array of IDs.
   * @param _page - Optional page number.
   * @throws Error - Method not implemented.
   */
    protected applyWithParams(
        _ids: string[],
        _page?: number,
    ): ActionResponse | GetResponse {
        throw new Error('Method not implemented.')
    }

    /**
   * Apply an action with a request body.
   * Creates a new employee and adds it to the employees array.
   * @param employee - The employee data to create.
   * @returns The action response.
   */
    public applyWithBody(employee: Omit<Employee, 'id'>): ActionResponse {
        try {
            // Create a new employee entity with a generated ID
            const newEmployee: Employee = {
                id: uuidv4(),
                ...employee,
            }

            // Validate the new employee data using the employeeSchema
            const result = employeeSchema.validate(newEmployee)
            const { error } = result

            if (error && error.message) {
                throw error.message
            }

            // Add the new employee to the employees array
            employees.push(newEmployee)

            return {
                status: HTTP_STATUS.SUCCESS,
            }
        } catch (err) {
            // Return an error response if an exception occurs during the creation process
            return {
                status: HTTP_STATUS.ERROR,
                error: err,
            }
        }
    }
}
