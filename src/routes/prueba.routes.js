import { Router } from 'express'
import { probarfecha } from '../controllers/prueba.controller.js'


const router = Router()

router.post('/prueba', probarfecha)

export default router