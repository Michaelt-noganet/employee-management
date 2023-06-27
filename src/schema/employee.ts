import joi from 'joi'
import { GENDER } from '../types/employee/gender'
import { POSITION } from '../types/employee/position'
import { DEPARTEMENT } from '../types/employee/departement'
import { EMPLOYMENT_STATUS } from '../types/employee/employement-status'

/**
 * Joi schema for validating employee data.
 */
export const employeeSchema = joi.object().keys({
    id: joi
        .string()
        .required(),
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
        .iso()
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
        .iso()
        .optional(),
    salary: joi
        .number()
        .optional(),
    employment_status: joi
        .string()
        .valid(...Object.values(EMPLOYMENT_STATUS))
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
