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
      items.string('name', 200).notNullable()
      items.string('category', 200).notNullable()
      items.string('price', 200).notNullable()
      items.string('location', 200).notNullable()
      items.string('description', 1000)
      items.string('url', 500)
      items.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
    })

    .createTable('meetings', (meetings) =>{
      meetings.increments('meeting_id')
      meetings.string('name').notNullable()
      meetings.string('date').notNullable()
      meetings.string('time').notNullable()
      meetings.string('location').notNullable()
      meetings.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
    })
    // use this to generate the list of foods a meeting
    .createTable('foods', (foods) =>{
      foods.increments('food_id')
      foods.string('name').notNullable()
      foods.integer('meeting_id')
        .unsigned()
        .notNullable()
        .references('meeting_id')
        .inTable('meetings')
        .onDelete('RESTRICT')
    })
    .createTable('reservations', (reservations) =>{
      reservations.increments('reservation_id')
      reservations.boolean('confirmed').notNullable()
      reservations.string('food').notNullable()
      reservations.integer('meeting_id')
        .unsigned()
        .notNullable()
        .references('meeting_id')
        .inTable('meetings')
        .onDelete('RESTRICT')
      reservations.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')      
      reservations.integer('food_id')
        .unsigned()
        .notNullable()
        .references('food_id')
        .inTable('foods')
        .onDelete('RESTRICT')
    })

    // {
    //   meetingId: "11",
    //   meetingName: "Foodapaloosa",
    //   people: [
    //     {username:"Abe123", item: "spaghetti", role: "organizer", confirmed: false}, 
    //     {username:"Gabe234", item: "cookies", role: "guest", confirmed: false},
    //     {username:"Sal123", item: "biscuits", role: "guest", confirmed: false},
    //     {username:"Phil2", item: "ratatouille", role: "guest", confirmed: false}
    //   ],
    //   items: ["spaghetti", "cookies", "biscuits", "pretzels", "ratatouille", "soda", "crackers", "cookies" ],
    //   date: "1/19/2021",
    //   time: "12PM-1PM",
    //   location: "McArthur Park",
    //   confirmed: false
    // },
    // {
    //   meetingId: "12",
    //   meetingName: "Feast Fest",
    //   people: [
    //     {username:"Abe123", item: "apricots", role: "guest", confirmed: false}, 
    //     {username:"Gabe234", item: "bread bowls", role: "guest", confirmed: false},
    //     {username:"Sal123", item: "chowder", role: "guest", confirmed: false},
    //     {username:"Phil2", item: "turkey", role: "organizer", confirmed: false}
    //   ],
    //   items: ["turkey","chowder","bread bowls","apricots", "ratatouille", "soda", "crackers", "cookies" ],
    //   date: "10/26/2021",
    //   time: "11PM-12PM",
    //   location: "BJHS staff lounge",
    //   confirmed: false
    // },
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('reservations')
    .dropTableIfExists('items')
    .dropTableIfExists('foods')
    .dropTableIfExists('meetings')
    .dropTableIfExists('users')
}
