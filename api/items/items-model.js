const db = require('../data/db-config')

function getItems() {
  return db('items')
}

function findBy(filter) {
  return db('items').where(filter)
}

function findById(item_id) {
  return db('items').where('item_id', item_id).first()
}

function findByUserID(user_id) {
  return db('items').where('user_id', user_id)
}

async function insertItem(item) {
  const [newItemObject] = await db('items')
      .insert(item, [
        'item_id',
        'name',
        'category',
        'price',
        'location',
        'description',
        'url',
        'user_id'])
  return newItemObject
}
  
async function updateItem(item, item_id) {
  const [newItemObject] = await db('items')
    .update(item, [
      'item_id',
      'name',
      'category',
      'price',
      'location',
      'description',
      'url',
      'user_id',
    ])
    .where('item_id', item_id)
  return newItemObject
}

function remove(item_id) {
  return db('items').where('item_id', item_id).del()
}

module.exports = {
  getItems,
  findBy,
  findById,
  findByUserID,
  insertItem,
  updateItem,
  remove,
}