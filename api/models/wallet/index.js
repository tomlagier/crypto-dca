module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    local: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Wallet.associate = function ({
    User,
    Wallet
  }) {
    Wallet.belongsTo(User);
  }

  return Wallet;
};