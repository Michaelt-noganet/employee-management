import express from 'express'

import {
    createEmployee,
    readEmployees,
    findEmployees,
    deleteEmployees,
    updateEmployees,
} from '../controllers'

const router = express.Router()

// Create
router.post(
    '/employee/create',
    createEmployee,
)

// Read
router.get(
    '/employee/read',
    readEmployees,
)
router.post(
    '/employee/find',
    findEmployees,
)

// Update
router.patch(
    '/employee/update',
    updateEmployees,
)

// Delete
router.delete(
    '/employee/delete',
    deleteEmployees,
)

export default router
