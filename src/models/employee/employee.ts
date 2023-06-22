import { DEPARTEMENT } from "./departement"
import { EMPLOYEMENT_STATUS } from "./employement-status"
import { GENDER } from "./gender"
import { POSITION } from "./position"

export interface BaseEmployee {
    id: string,
    first_name: string,
    last_name: string,
    citizen_id: string,
}

export interface Employee extends BaseEmployee {
    email: string,
    phone_number: string,
    date_of_birth: Date,
    gender: GENDER,
    position?: POSITION,
    departement?: DEPARTEMENT
    date_of_joining?: Date,
    salary?: number,
    employement_status?: EMPLOYEMENT_STATUS,
    supervisor?: string,
    emergency_contact?: string,
    work_schedule?: string,
}

