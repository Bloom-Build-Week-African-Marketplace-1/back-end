exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('items', (items) =>{
      items.increments('item_id')
      items.string('name').notNullable()
      items.string('category').notNullable()
      items.float('price').notNullable()
      items.string('location').notNullable()
      items.string('description')
      items.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('items')
    .dropTableIfExists('users')
}
