import express from 'express'
import { createEmployee, readAllEmployee, readOneEmployee } from '../controllers'

const router = express.Router()

router.post('/employee', createEmployee)

router.get('/employees', readAllEmployee)

router.get('/employee/:id', readOneEmployee)

export default router