import { Employee } from '../types/employee'
import { employees } from '../fixtures/employees'
import { ApiResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { v4 as uuidv4 } from 'uuid'
import { employeeSchema } from '../schema/employee'

/**
 * Service class for creating an employee.
 * Extends the AbstractService class.
 */
export class CreateService extends AbstractService<{
    employee: Omit<Employee, 'id'>,
}> {
    /**
   * Creates a new employee and adds it to the employees array.
   * @param employee - The employee data to create.
   * @returns The action response.
   */
    public applyAction(input: {employee: Omit<Employee, 'id'>}): ApiResponse {
        // Create a new employee entity with a generated ID
        const newEmployee: Employee = {
            id: uuidv4(),
            ...input.employee,
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
    }
}
