import express from 'express'
import './conexionNoSQL.js'

import ordenes from './rutasNoSQL.js'

const app = express()

let port = 3300

app.set('port',port)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(ordenes)

export default app 