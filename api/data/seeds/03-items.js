exports.seed = function (knex) {
    return knex('items').insert([
      {
        item_id: 0,
        name: 'thing',
        category: 'stuff',
        price: 420.69,
        location:'Djibouti',
        description: 'thing does stuff',
        user_id: 0,
      },
    ]);
  };