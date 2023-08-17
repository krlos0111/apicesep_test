import { Router } from 'express'
import {crearBitacoraEnca, crearBitacoraCuerpo,getBitacoracuerpo} from '../controllers/bitacoraencb.controller.js'


const router = Router()

router.post('/bitacoraencb', crearBitacoraEnca)
router.post('/bitacoracrearcuerpo', crearBitacoraCuerpo)
router.post('/getbitcuerpo', getBitacoracuerpo)

export default router