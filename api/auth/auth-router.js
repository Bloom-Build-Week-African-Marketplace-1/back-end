const router = require("express").Router()
const bcrypt = require("bcryptjs")
const buildToken = require("./token-builder")
const {
  checkUsernameFree,
  checkUsernameExists,
  validateUser,
} = require("./auth-middleware")
const Users = require('../users/users-model')

router.post("/register", validateUser, checkUsernameFree,
    async (req, res, next) => {
      try {
        const { username, password} = req.body
        const hash = bcrypt.hashSync(password, 8)
        const newUser = await Users.insertUser({ username, password: hash})
        res.status(201).json(newUser)
      } catch (err) {
        next(err)
      }
})

router.post( "/login", validateUser, checkUsernameExists,
    (req, res, next) => {
      const { password } = req.body
      if (bcrypt.compareSync(password, res.user.password)) {
        const token = buildToken(res.user)
        res.status(200).json({
          message: `welcome, ${res.user.username}`,
          user_id: res.user.user_id,
          token,
        })
      } else {
        next({ status: 401, message: "invalid credentials" })
      }
    }
)

module.exports = router;