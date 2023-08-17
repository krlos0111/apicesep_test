import { Router } from 'express'
import { getclientesasignados } from '../controllers/clientes.controller.js'


const router = Router()

router.get('/clientes/:id', getclientesasignados)

export default router