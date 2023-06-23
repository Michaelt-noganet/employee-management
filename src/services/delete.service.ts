import { METHODS } from '../models/api'
import { AbstractService } from './abstract.service'

export class DeleteService extends AbstractService {
    protected method = METHODS.DELETE
    protected message = (employeeFirstName: string, employeeLastName: string): string => {
        return `The employee ${ employeeFirstName } ${ employeeLastName } has been deleted successfully`
    }
}