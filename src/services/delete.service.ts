import { METHODS } from '../models/api'
import { AbstractService } from './abstract.service'

export class DeleteService extends AbstractService {
    protected method = METHODS.DELETE
    protected message = (id: string): string => {
        return `The employee ${ id } has been deleted successfully`
    }
}