const bcrypt = require('bcrypt-nodejs');
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    Wallet,
    Transaction
  }) {
    User.Coins = User.hasMany(Coin);
    User.Wallets = User.hasMany(Wallet);
    User.Options = User.hasMany(Option);
    User.Transactions = User.hasMany(Transaction);
  }

  User.checkPassword = async function (name, password) {
    const user = await User.findOne({ where: { name } })
    if (!user) return { user: null, validLogin: false };
    const validLogin = await user.checkPassword(password);
    return { user, validLogin };
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