import { Router } from 'express'
import { verificarHorario } from '../controllers/asignacion.controller.js'


const router = Router()

router.post('/asignacion', verificarHorario)

export default router