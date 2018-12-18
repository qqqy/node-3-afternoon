const users = require('../models/users')
var id = 1

module.exports = {
  login: function(req, res, next){
    const { username, password} = req.body
    let match = users.find((userOb, i) => userOb.username === username && userOb.password === password)
    if (match){req.session.user.username = username, res.status(200).send(req.session.user)} else { res.sendStatus(500)}
  }
  ,
  register: function(req, res, next){
    const { username, password} = req.body
    if(username && password){
      let newUser = {
        id: id,
        username,
        password
      }
      console.log(`registering ${newUser}`)
      users.push(newUser)
      id++
      console.log(`ID is now ${id}`)
      res.status(200).send(req.session.user)
    } else {
      res.status(401).send('Invalid Username or Password')
    }
  }
  ,
  signout: function(req, res, next){
    req.session.destroy()
    res.status(200).send(req.session)
  }
  ,
  getUser: function(req, res, next){
    res.status(200).send(req.session.user)
  }
}