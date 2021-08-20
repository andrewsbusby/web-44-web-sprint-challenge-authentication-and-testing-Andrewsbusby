const { JWT_SECTECT } = require('../secret/secrec');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  const token = req.headers.authorization
    if(!token) {
      return next({ status: 401, message: 'Token required'})
    } 
    jwt.verity(token, JWT_SECTECT, (err, decodedToken) => {
      if (err) {
        next({ status: 401, message: 'Token invalid' })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  
};
