const router = require("express").Router()
const Items = require("./items-model")
const { validateItem, validateItemId } = require("./items-middleware")
const { restricted } = require('../auth/auth-middleware')

router.get("/", async (req, res, next) => {
  try {
    const items = await Items.getItems()
    res.status(200).json(items)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", restricted, validateItemId, async (req, res, next) => {
  try {
    const item = await Items.findById(req.params.id)
    res.status(200).json(item)
  } catch (err) {
    next(err)
  }
})

router.post("/", restricted, validateItem, 
  async (req, res, next) => {
    try {
      const { 
        name,
        category,
        price,
        location,
        description,
        url,
        user_id,
      } = req.body;

      const newItem = await Items.insertItem({ 
        name,
        category,
        price,
        location,
        description,
        url,
        user_id,
      })
      res.status(201).json(newItem)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", restricted, validateItemId, validateItem, async (req, res, next) => {
    try {
      const updatedItem = await Items.updateItem(req.item, req.params.id)
      res.status(200).json(updatedItem)
    } catch (err) {
      next(err)
    }
})

router.delete("/:id", restricted, validateItemId, async (req, res, next) => {
  try {
    await Items.remove(req.params.id)
    res.status(200).json(`item deleted successfully`)
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = router