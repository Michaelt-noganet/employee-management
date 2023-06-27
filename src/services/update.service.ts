import { ApiResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'
import { Employee } from '../types/employee'
import { employeeSchema } from '../schema/employee'


/**
 * Service class for update some employees.
 * Extends the AbstractService class.
 */
export class UpdateService extends AbstractService<{
    entities: Record<string, Partial<Employee>>,
}> {
    /**
 * Updates the specified employees with the provided data.
 * @param input - The request body containing the data to update the employees.
 * @param ids - An array of employee IDs to update.
 * @returns The ActionResponse indicating the success or failure of the update operation.
 */
    protected applyAction(input: Record<string, Partial<Employee>>): ApiResponse  {
        Object.keys(input.entities).map(id => {
            // Find the employee with the specified ID
            const employee = employees.find(employee => employee.id === id)
            if (!employee) {
                throw `Employee_id: ${ id } not found`
            }

            // Extract the key-value pair from the input object
            const [key, value] = Object.entries(input.entities[id])[0]

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
    }
}
