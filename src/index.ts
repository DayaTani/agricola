import app from './app'

if (!process.env.PASSWORD) {
  console.error('Authentication password must be set!')
  process.exit(1)
}

/** The port on which the server listens for incoming connections. */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
