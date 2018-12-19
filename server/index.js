const express = require('express')
const session = require('express-session')
require('dotenv').config()
const {SESSION_SECRET, SERVER_PORT} = process.env
const checkForSession = require('./middlewares/checkForSession')
const ctrlSwag = require('./controllers/swag_controller')
const ctrlAuth = require('./controllers/auth_controller')
const ctrlCart = require('./controllers/cart_controller')
const ctrlSearch = require('./controllers/search_controller')

let app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))


app.get('/api/swag' , ctrlSwag.read )
app.post('/api/login', ctrlAuth.login)
app.post('/api/register', ctrlAuth.register)
app.post('/api/signout', ctrlAuth.signout)
app.get('/api/user', ctrlAuth.getUser)
app.post('/api/cart', ctrlCart.add)
app.post('/api/cart/checkout', ctrlCart.checkout)
app.delete('/api/cart', ctrlCart.delete)
app.get('/api/search' , ctrlSearch.search)


app.listen(SERVER_PORT, () => console.log('Server Listening on ', SERVER_PORT))