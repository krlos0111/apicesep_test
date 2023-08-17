import { Router } from 'express'
import { horarioUsuario,actualizacionEstadoUs,ActualAsigCalendario ,crearAsistencia,actualizarAsistencia} from '../controllers/horario.controller.js'


const router = Router()

router.get('/horario/:id', horarioUsuario)
router.post('/actusu', actualizacionEstadoUs) 
router.post('/actasgcal', ActualAsigCalendario) 
router.post('/crearasist', crearAsistencia) 
router.post('/actasistencia', actualizarAsistencia) 

export default router