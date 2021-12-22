// const Users = require("../users/users-model")
const Items = require('./items-model')

const validateItem = async (req, res, next) => {
  const { name, category, price, location, user_id} = req.body
  if (
    !name ||
    !name.trim() ||
    !category ||
    !category.trim() ||
    !location ||
    !location.trim() ||
    !price ||
    !user_id
  ) {
    next({ status: 400, message: "name, category, price, location, and user_id required" })
  }
  req.item = req.body
  next()
}

const validateItemId = async (req, res, next) => {
  try {
    const item = await Items.findById(req.params.id)
    if (item) {
      next()
    } else {
      next({ status: 404, message: "item not found" })
    }
  } catch (error) {
    next(error)
  }
}

module.exports ={
    validateItem,
    validateItemId
}