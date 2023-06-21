import { METHODS } from '../models/api'
import { AbstractService } from './abstract.service'

export class PostService extends AbstractService {
    protected method = METHODS.POST
    protected message = (employeeFirstName: string, employeeLastName: string): string => {
        return `The new employee ${employeeFirstName} ${employeeLastName} has been registered successfully`
    }
}