const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.VIRTUAL,
    password_hash: Datatypes.STRING,
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      }
    }
  });

  User.prototype.checkpassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }

  return User;
};