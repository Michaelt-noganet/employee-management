import { employees } from '../fixtures/employees'
import { METHODS } from '../types/api'
import { AbstractService } from './abstract.service'

export class DeleteService extends AbstractService<{}> {
    protected method = METHODS.DELETE
    protected statusCode: number;
    protected errorMessage?: string;
    protected applyOne(_input: Record<string, any>, id: string): { success: boolean }  {
        try {
            if (id) {
                const index: number = employees.findIndex(employee => employee.id === id)
                if (index != -1) {
                    employees.splice(
                        index,
                        1
                    )
                } else {
                    throw 'Id not found'
                }
            }
            return {
                success: true
            }
        } catch (err) {
            this.errorMessage = err
            return {
                success: false
            }
        }
    }
}