exports.seed = function (knex) {
    return knex('items').insert([
      {
        item_id: 0,
        name: 'table',
        category: 'furniture',
        price: '399.99 MT',
        location:'Mozambique',
        description: 'dining room table',
        url:"",
        user_id: 0,
      },
    ])
  }