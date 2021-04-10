
const jwt = require('jsonwebtoken')
const User = require ('../models/user')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({
      error: 'token missing or invalid FROM ERRORHANDELR MIDDLEWARE'
    })
  
  }
  next()

}


const tokenExtractor = (request, response ,next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    next()
  }

  const userExtractor = async (request, response ,next) => {
    let decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    // console.log('middlewwaresta tulostus', request.user)
    
    next()
  }


 module.exports = {tokenExtractor, errorHandler, userExtractor}