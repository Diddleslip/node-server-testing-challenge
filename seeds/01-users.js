
exports.seed = function(knex) {
  
  const users = [
    {
      username: "Swaglord123",
      password: "123ABC"
    },
    {
      username: "grindszn",
      password: "cba321"
    },
    {
      username: "mhother",
      password: "father"
    },
  ]
  
  return knex('users').insert(users);
};
