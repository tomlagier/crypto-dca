const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(user) {
        return cryptPassword(user.password)
        .then(success => user.password = success)
        .catch(err => err && console.error(err));
      }
    }
  });

  User.associate = function ({
    User,
    Coin,
    Option,
    Wallet
  }) {
    User.hasMany(Coin);
    User.hasMany(Wallet);
    User.hasMany(Option);
  }

  User.prototype.checkPassword = function(password) {
    return new Promise((res, rej) =>
      bcrypt.compare(password, this.password, (err, resp) => {
        if (err) return rej(err);
        return res(resp);
      })
    );
  }

  return User;
};

function cryptPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}