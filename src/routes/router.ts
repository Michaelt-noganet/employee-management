import express from 'express'
import { registerEmployee } from '../controllers'

const router = express.Router()

router.post('/employee', registerEmployee)

export default router