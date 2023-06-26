import { employees } from '../fixtures/employees'
import { ActionResponse, GetResponse, HTTP_STATUS } from '../types/api'
import { AbstractService } from './abstract.service'

export class DeleteService extends AbstractService<{}> {
    protected applyWithBody(_input: {}, _ids: string[], _page?: number): GetResponse {
        throw new Error('Method not implemented.');
    }

    protected applyWithParams(ids: string[]): ActionResponse  {
        try {
            ids.map(id => {
                const index: number = employees.findIndex(employee => employee.id === id)
                if (index != -1) {
                    employees.splice(
                        index,
                        1
                    )
                } else {
                    throw 'Id not found'
                }
            })
            return {
                status: HTTP_STATUS.SUCCESS
            }
        } catch (err) {
            return {
                status: HTTP_STATUS.ERROR,
                error: err
            }
        }
    }
}