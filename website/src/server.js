import express from 'express'
import ssr from './handler-ssr'
const PORT = process.env.PORT || 3000

const app = express()

app.use(ssr)

app.listen(PORT || 3000, err => {
  if(err) {
    console.log('Error with the damn express 🤷🏾‍♂️', { err })
    process.exit(1)
  }

  console.log(`I'm all 👂🏾 on port ${PORT}. 👍🏾`)
})
