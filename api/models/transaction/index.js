const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
    startAmount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    endAmount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Transaction.associate = function ({
    User,
    Coin,
    Wallet,
    Transaction
  }) {
    Transaction.User = Transaction.belongsTo(User);
    Transaction.StartWallet = Transaction.belongsTo(Wallet, {
      as: 'startWallet'
    });
    Transaction.EndWallet = Transaction.belongsTo(Wallet, {
      as: 'endWallet'
    });
    Transaction.StartCoin = Transaction.belongsTo(Coin, {
      as: 'startCoin'
    });
    Transaction.EndCoin = Transaction.belongsTo(Coin, {
      as: 'endCoin'
    });
  }

  return Transaction;
};