import express from 'express'

import { 
    createEmployee,
    readAllEmployee,
    findEmployees,
    deleteOneEmployee,
    updateOneEmployee
} from '../controllers'

const router = express.Router()

// Create
router.post('/employee/create', createEmployee)

// Read
router.get('/employee/read', readAllEmployee)
router.post('/employee/find', findEmployees)

// Update
router.patch('/employee/update', updateOneEmployee)

// Delete
router.delete('/employee/delete', deleteOneEmployee)

export default router