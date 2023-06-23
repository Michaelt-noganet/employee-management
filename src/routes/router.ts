import express from 'express'
import { 
    createEmployee,
    readAllEmployee,
    readOneEmployee,
    deleteOneEmployee } from '../controllers'

const router = express.Router()

// Create
router.post('/employee', createEmployee)


// Read
router.get('/employees', readAllEmployee)

router.get('/employee/:id', readOneEmployee)

// Update


// Delete
router.delete('/employee/:id', deleteOneEmployee)

export default router