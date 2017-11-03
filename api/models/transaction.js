module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    success: {
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
    Transaction.belongsTo(User);
    Transaction.belongsTo(Wallet, {
      as: 'startWallet'
    });
    Transaction.belongsTo(Wallet, {
      as: 'endWallet'
    });
    Transaction.belongsTo(Coin, {
      as: 'startCoin'
    });
    Transaction.belongsTo(Coin, {
      as: 'endCoin'
    });
  }

  return Transaction;
};