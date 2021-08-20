const User = require('../users/users_model');

const checkUsernameFree = async (req, res, next) =>{
    try{
       const users = await User.findBy({ username: req.body.username })
       if(!users.length) {
           next()
       } else {
        next({ status: 422, message: 'username taken'})
       }
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    checkUsernameFree
}