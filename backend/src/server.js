const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)


app.use('/files', express.static('public'))


app.listen(8080, () => {
  console.log('Server run dev!')
})
