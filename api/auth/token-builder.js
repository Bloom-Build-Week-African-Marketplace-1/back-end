const jwt = require("jsonwebtoken")
// const { JWT_SECRET } = process.env.JWT_SECRET

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: "1d",
  }
  const token = jwt.sign(payload, 'shh', options)
  return token
}