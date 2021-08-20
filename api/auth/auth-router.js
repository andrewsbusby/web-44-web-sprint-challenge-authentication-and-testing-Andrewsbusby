const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret/secrec');
const User = require('../users/users_model');
const mw = require('../middleware/auth-middleware');


router.post('/register', mw.checkUsernameFree, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  User.add({ username, password: hash})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)

});

router.post('/login', mw.checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync( req.body.password, req.useranme.password )) {
    const token = buildToken(req.user)
    res.json({
      message: `Welcome, ${req.user.username}`, 
      token,
    })
  } else {
    next({ status: 401, message: 'Invalid credentials'})
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiration: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
