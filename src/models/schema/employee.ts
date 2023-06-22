import joi from 'joi'
import { GENDER } from '../employee/gender'
import { POSITION } from '../employee/position'
import { DEPARTEMENT } from '../employee/departement'
import { EMPLOYEMENT_STATUS } from '../employee/employement-status'

export const employeeSchema = joi.object().keys({
    id: joi
        .string()
        .optional(),
    first_name: joi
        .string()
        .required(),
    last_name: joi
        .string()
        .required(),
    citizen_id: joi
        .string()
        .required(),
    email: joi
        .string()
        .email()
        .optional(),
    phone_number: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .message('Phone number must have 10 digits.')
        .optional(),
    date_of_birth: joi
        .date()
        .optional(),
    gender: joi
        .string()
        .valid(...Object.values(GENDER))
        .optional(),
    position: joi
        .string()
        .valid(...Object.values(POSITION))
        .optional(),
    departement: joi
        .string()
        .valid(...Object.values(DEPARTEMENT))
        .optional(),
    date_of_joining: joi
        .date()
        .optional(),
    salary: joi
        .number()
        .optional(),
    employement_status: joi
        .string()
        .valid(...Object.values(EMPLOYEMENT_STATUS))
        .optional(),
    supervisor: joi
        .string()
        .optional(),
    emergency_contact: joi
        .string()
        .optional(),
    work_schedule: joi
        .string()
        .optional(),
})
