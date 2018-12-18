const express = require('express')
const session = require('express-session')
require('dotenv').config()
const {SESSION_SECRET, SERVER_PORT} = process.env
const checkForSession = require('./middlewares/checkForSession')
const ctrlSwag = require('./controllers/swag_controller')

let app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(checkForSession)


app.get('/api/swag' , ctrlSwag.read )


app.listen(SERVER_PORT, () => console.log('Server Listening on ', SERVER_PORT))