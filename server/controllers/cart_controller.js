const swag = require('../models/swag')

module.exports = {
  add(req,res,next){
    // console.log(req.session.user.cart)
    if(req.query.id){
      let match = req.session.user.cart.find(item => item.id === +req.query.id)
      // console.log(req.session.user.cart)
      if(match){res.status(200).send(req.session.user)} else {
        let item = swag.find(item => item.id === +req.query.id)
        // console.log(swag.find(item => item.id == req.query.id))
        if(item){
          req.session.user.cart.push(item)
          req.session.user.total = req.session.user.total + item.price
          res.status(200).send(req.session.user)
        } else {
          res.status(500).send('Cannot find item!')
        }
      }
    }
  }
  ,
  delete(req,res,next){
    if(req.query.id){
      let index = req.session.user.cart.findIndex(item => item.id === +req.query.id)
      if(index === -1){index = req.session.user.cart.length}
      req.session.user.total = req.session.user.total - req.session.user.cart[index].price
      req.session.user.cart.splice(index, 1)
      res.status(200).send(req.session.user)
    } else {
      res.status(500).send('Item not found in cart!')
    }
  }
  ,
  checkout(req,res,next){
    req.session.user.cart = []
    req.session.user.total = 0
    res.status(200).send(req.session.user)
  }
}