const User = require('../users/users_model');

async function checkUsernameFree  (req, res, next) {
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

async function checkUsernameExists (req, res, next) {
    try{
        const [user] = await User.findBy({ username: req.body.username })
        if(!user) {
            next({ status: 401, message: 'username not found'})
        } else {
            next({ status: 200, message: `welcome ${user}`})
        }
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    checkUsernameFree,
    checkUsernameExists
}