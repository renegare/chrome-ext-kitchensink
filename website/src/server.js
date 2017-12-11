import express from 'express'
import ssr from './handler-ssr'
import path from 'path'

const PORT = process.env.PORT || 3000
const ASSETPATH =
  process.env.ASSETPATH || path.resolve(__dirname, '..', '..', 'dist')

const app = express()

console.log('CONFIG', { PORT, ASSETPATH })

app.use('/server', express.static(ASSETPATH))

app.use('/', ssr)

app.listen(PORT || 3000, err => {
  if (err) {
    console.log('Error with the damn express 🤷🏾‍♂️', { err })
    process.exit(1)
  }

  console.log(`I'm all 👂🏾 on port ${PORT}. 👍🏾`)
})
