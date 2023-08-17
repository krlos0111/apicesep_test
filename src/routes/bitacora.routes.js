import { Router } from 'express'
import { getBitacoracuerpo,getBitacora, verBitacoraEnca,obtenerBitEncabezadoxId,obtenerBitEncabezado,datosBitacoracuerpo } from '../controllers/bitacora.controller.js'


const router = Router()

router.get('/bitacora', getBitacoracuerpo)
router.get('/bitacora/:id', getBitacora)
router.post('/bitacora', verBitacoraEnca)
router.get('/bitacoraencxid/:id', obtenerBitEncabezadoxId)
router.post('/bitacoraenc', obtenerBitEncabezado)
router.post('/bitacoracuerpo', datosBitacoracuerpo)

export default router