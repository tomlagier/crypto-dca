module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define('Coin', {
    feeTolerance: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
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
      defaultValue: "0"
    },
    exchangeAmount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    purchaseAmount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    }
  });

  Coin.associate = function ({
    User,
    Wallet,
    Coin
  }) {
    Coin.belongsTo(User);
    Coin.belongsTo(Wallet, {
      as: 'localWallet'
    });
    Coin.belongsTo(Wallet, {
      as: 'exchangeWallet'
    });
  }

  return Coin;
};