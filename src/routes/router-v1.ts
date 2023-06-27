import express from 'express'

import {
    createEmployee,
    readEmployees,
    findEmployees,
    deleteEmployees,
    updateEmployees,
} from '../controllers'

/**
 * Express router for API version 1.
 */
const v1Router = express.Router()

// Create
v1Router.post(
    '/v1/employee/create',
    createEmployee,
)

// Read
v1Router.get(
    '/v1/employee/read',
    readEmployees,
)
v1Router.post(
    '/v1/employee/find',
    findEmployees,
)

// Update
v1Router.patch(
    '/v1/employee/update',
    updateEmployees,
)

// Delete
v1Router.delete(
    '/v1/employee/delete',
    deleteEmployees,
)

export default v1Router
