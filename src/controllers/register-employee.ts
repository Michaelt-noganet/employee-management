import { Employee } from '../models/employee'
import { PostService } from '../services'

const postService = new PostService()

export const formatId = (employeeFirstName: string, employeeLastName: string, citizenId: string): string => {
    return `${ employeeFirstName.toLowerCase() }${ employeeLastName[0].toLocaleLowerCase() }#${ new Date().getTime() }#${ citizenId }`
}


export const registerEmployee = (employee: Omit<Employee, 'id'>) => {
    const id = formatId(employee.first_name, employee.last_name, employee.citizen_id)
    return postService.apiAction({
        id,
        ...employee
    })

}
