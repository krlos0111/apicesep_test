import { Router } from 'express'
import { listaincidentes } from '../controllers/incidentes.controller.js'


const router = Router()

router.get('/incidentes', listaincidentes)

export default router