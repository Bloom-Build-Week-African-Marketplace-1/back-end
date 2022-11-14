exports.seed = function (knex) {
    return knex("users").insert([
      {
        user_id: 0,
        username: "happycrafts",
        password: "$2a$08$5dhacrowoNUSKFF3T4Gdj.JDljMcU.vXVjgoOdt3jbgxi3Tc/blfS",
      },
      {
        user_id: 1,
        username: "marketplace",
        password: "$2a$08$5dhacrowoNUSKFF3T4Gdj.JDljMcU.vXVjgoOdt3jbgxi3Tc/blfS",
      },
    ]);
  };