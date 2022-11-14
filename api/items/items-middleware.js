const Items = require('./items-model')

const validateItem = async (req, res, next) => {
  const { name, category, price, location } = req.body
  if (
    !name ||
    !category ||
    !location ||
    !price
  ) {
    next({ status: 400, message: "name, category, price, location required" })
  }
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