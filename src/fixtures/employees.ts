import { GENDER } from '../types/employee/gender'
import { Employee } from '../types/employee'
import { POSITION } from '../types/employee/position'
import { EMPLOYMENT_STATUS } from '../types/employee/employement-status'

export const employees: Employee[] = [
    {
        id: '6fca1a66-7c26-4924-9006-68d04eeec9b2',
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
        employment_status: EMPLOYMENT_STATUS.FULL_TIME,
        supervisor: 'My wife',
        emergency_contact: '0522982072',
        work_schedule: '5 hours'
    },
    {
        id: 'f90773c7-a90b-4f24-bcf6-036477e521c5',
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
        employment_status: EMPLOYMENT_STATUS.FULL_TIME,
        supervisor: 'Sarah Netanyahu',
        emergency_contact: 'Sarah Netanyahu',
        work_schedule: '0.5 hours'
    },
    {
        id: 'f90773c7-a90b-4f24-bcf6-e345477e521c5',
        first_name: 'Poutine',
        last_name: 'Vladimir',
        citizen_id: '5498376251',
        email: 'vlad.poutine@gmail.com',
        phone_number: '0512345678',
        date_of_birth: new Date('10/07/1952'),
        gender: GENDER.MALE,
        position: POSITION.DISHWASHER,
        date_of_joining: new Date('06/22/2023'),
        salary: 20000,
        employment_status: EMPLOYMENT_STATUS.FULL_TIME,
        supervisor: 'Group Wagner',
        emergency_contact: 'CIA',
        work_schedule: '200 hours'
    }
]