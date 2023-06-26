import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'
import { employees } from '../fixtures/employees'
import { Employee } from '../types/employee'
import { employeeSchema } from '../schema/employee'



export class UpdateService extends AbstractService<object> {
    protected applyWithParams(
        _ids: string[], _page?: number,
    ): GetResponse | ActionResponse {
        throw new Error('Method not implemented.')
    }

    protected applyWithBody(
        input: {[key: string]: any },
        ids: string[],
    ): ActionResponse  {
        try {
            ids.map(id => {
                const employee = employees.find(employee => employee.id === id)
                if (!employee) {
                    throw `Employee_id: ${ id } not found`
                }
                const [key, value] = Object.entries(input)[0]
                const newEmployee: Employee = {
                    ...employee,
                    [key]: value,
                }
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
            return {
                status: HTTP_STATUS.ERROR,
                error: err,
            }
        }
    }
}
