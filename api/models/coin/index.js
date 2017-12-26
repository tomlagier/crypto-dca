const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define('Coin', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
    feeTolerance: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    portfolioWeight: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    localAmount: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    exchangeAmount: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    purchaseAmount: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Coin.associate = function({ User, Wallet, Coin }) {
    Coin.User = Coin.belongsTo(User);
    Coin.LocalWallet = Coin.belongsTo(Wallet, {
      as: 'localWallet'
    });
    Coin.ExchangeWallet = Coin.belongsTo(Wallet, {
      as: 'exchangeWallet'
    });
  };

  return Coin;
};
