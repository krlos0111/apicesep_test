import express from 'express'

import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'
import bitacoraRoutes from './routes/bitacora.routes.js'
import bitacoraencbRoutes from './routes/bitacoraencb.routes.js'
import clienteRoutes from './routes/clientes.routes.js'
import horarioRoutes from './routes/horario.routes.js'
import incidentesRoutes from './routes/incidentes.routes.js'
import pruebaRoutes from './routes/prueba.routes.js'
import asignacion from './routes/asignacion.routes.js'

const app = express()

app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api', bitacoraRoutes)
app.use('/api', bitacoraencbRoutes)
app.use('/api', clienteRoutes)
app.use('/api', horarioRoutes)
app.use('/api', incidentesRoutes)
app.use('/api', pruebaRoutes)
app.use('/api', asignacion)
app.use(indexRoutes)

process.env.TZ='UTC-5';

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint Not found'
    })
})

export default app;
