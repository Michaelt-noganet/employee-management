import { METHODS } from '../models/api'
import { AbstractService } from './abstract.service'

export class GetService extends AbstractService {
    protected method = METHODS.GET
    protected message = (): string => {
        return `Information for employees`
    }
}