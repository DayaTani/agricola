import express from 'express'
import logger from './middlewares/logger'
import router from './router'

if (!process.env.PASSWORD) {
  console.error('Authentication password must be set!')
  process.exit(1)
}

/** Express application to manage farmer information. */
const app = express()

app.use(express.json())
app.use(logger)

app.use('/farmers', router)

/** The port on which the server listens for incoming connections. */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
