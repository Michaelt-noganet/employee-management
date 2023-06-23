import { METHODS } from '../models/api'
import { AbstractService } from './abstract.service'

export class UpdateService extends AbstractService {
    protected method = METHODS.PUT
    protected message = (employeeFirstName: string, employeeLastName: string): string => {
        return `The employee ${ employeeFirstName } ${ employeeLastName } has been updated successfully`
    }
}