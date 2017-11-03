module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    startCurrency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Coin', key: 'id' }
    },
    startWallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Wallet', key: 'id' }
    },
    endCurrency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Coin', key: 'id' }
    },
    endWallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Wallet', key: 'id' }
    },
    amount: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Transaction.associate = function ({ User, Wallet, Transaction }) {
    Transaction.belongsTo(User);
    Transaction.belongsTo(Wallet);
  }

  return Transaction;
};