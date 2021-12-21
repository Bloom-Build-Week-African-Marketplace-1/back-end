exports.seed = function (knex) {
    return knex("users").insert([
      {
        user_id: 0,
        username: "asdfman",
        password: "asdf",
      },
    ]);
  };