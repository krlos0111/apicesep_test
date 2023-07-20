import { Router } from 'express'
import { getUsuarios, crearUsuarios, actualizarUsuarios, deleteUsuarios,getUsuario,verificarUsuarioLogin } from '../controllers/users.controller.js'


const router = Router()

router.get('/usuario', getUsuarios)

router.post('/usuario', verificarUsuarioLogin)

router.get('/usuario/:id', getUsuario)

router.post('/usuario', crearUsuarios)

router.put('/usuario', actualizarUsuarios)

router.delete('/usuario', deleteUsuarios)

export default router