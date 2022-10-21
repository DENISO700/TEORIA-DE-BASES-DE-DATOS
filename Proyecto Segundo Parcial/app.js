import express from 'express'
import './conexion.js'

import ordenes from './rutas.js'

const app = express()

let port = 3300

app.set('port',port)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(ordenes)

export default app 