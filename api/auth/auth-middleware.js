const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'shh'

const checkUsernameFree = async (req, res, next) => {
    const { username } = req.body
    const user = await Users.findBy({ username }).first()
    if (!user) {
      res.user = req.body
      next()
    } else {
      next({ status: 401, message: "username taken" })
    }
}

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body
    const user = await Users.findBy({ username }).first()
    if (user) {
      res.user = user
      next()
    } else {
      next({ status: 401, message: "invalid credentials" })
    }
}
  
const validateUser = async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !username.trim() || !password || !password.trim()) {
      next({ status: 400, message: "user and password are required" })
    }
    next()
}
  
const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      return next({ status: 401, message: "token required" })
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return next({ status: 401, message: "token invalid" })
      }
      req.decodedToken = decodedToken
      return next()
    })
}

module.exports = {
    checkUsernameFree,
    checkUsernameExists,
    validateUser,
    restricted,
  }