const swag = require('../models/swag')

module.exports = {
  search: function(req,res,next){
    const { category } = req.query
    let results = swag.filter(item => item.category === category)
    if(results.length === 0){
      res.status(200).send(swag)
    } else {
      res.status(200).send(results)
    }
  }
}