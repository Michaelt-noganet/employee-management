import express from 'express'
import { 
    createEmployee,
    readAllEmployee,
    selectEmployees,
    deleteOneEmployee,
    updateOneEmployee
} from '../controllers'

const router = express.Router()

// Create
router.post('/employee/create', createEmployee)

// Read
router.get('/employee/read-all', readAllEmployee)
router.get('/employee/select', selectEmployees)

// Update
router.put('/employee/update', updateOneEmployee)

// Delete
router.delete('/employee/delete', deleteOneEmployee)

export default router