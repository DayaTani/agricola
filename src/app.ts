import cors from 'cors'
import express from 'express'
import logger from './middlewares/logger'
import router from './router'

/** Express application to manage farmer information. */
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/farmers', router)

export default app
