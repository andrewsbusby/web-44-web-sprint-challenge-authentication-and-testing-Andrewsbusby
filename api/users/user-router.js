const router = require('express').Router()
const User = require('./users_model');

router.get('/', async (req, res, next) => {
    try{
        const user = await User.find()
        res.json(user)
    }
    catch(err){
        next(err)
    }
})


module.exports = router