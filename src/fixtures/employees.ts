import { GENDER } from '../models/employee/gender'
import { Employee } from '../models/employee'
import { POSITION } from '../models/employee/position'
import { EMPLOYEMENT_STATUS } from '../models/employee/employement-status'

export const employees: Employee[] = [
    {
        id: 'michaelt',
        first_name: 'Michael',
        last_name: 'Touboul',
        citizen_id: '327462529',
        email: 'mica.touboul@gmail.com',
        phone_number: '0522982072',
        date_of_birth: new Date('02/12/1981'),
        gender: GENDER.MALE,
        position: POSITION.EXPEDITOR,
        date_of_joining: new Date('06/22/2023'),
        salary: 20000,
        employement_status: EMPLOYEMENT_STATUS.FULL_TIME,
        supervisor: 'My wife',
        emergency_contact: '0522982072',
        work_schedule: '5 hours'
    },
    {
        id: 'binyaminn',
        first_name: 'Benjamin',
        last_name: 'Netanyahu',
        citizen_id: '123456789',
        email: 'ben.netanyahu@gmail.com',
        phone_number: '0512345678',
        date_of_birth: new Date('10/21/1949'),
        gender: GENDER.MALE,
        position: POSITION.DISHWASHER,
        date_of_joining: new Date('06/22/2023'),
        salary: 20000,
        employement_status: EMPLOYEMENT_STATUS.FULL_TIME,
        supervisor: 'Sarah Netanyahu',
        emergency_contact: 'Sarah Netanyahu',
        work_schedule: '0.5 hours'
    }
]