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
    '/employee/create',
    createEmployee,
)

// Read
v1Router.get(
    '/employee/read',
    readEmployees,
)
v1Router.post(
    '/employee/find',
    findEmployees,
)

// Update
v1Router.patch(
    '/employee/update',
    updateEmployees,
)

// Delete
v1Router.delete(
    '/employee/delete',
    deleteEmployees,
)

export default v1Router
