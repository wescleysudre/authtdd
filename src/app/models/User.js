module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    password_hash: Datatypes.STRING,
  });

  return User;
};