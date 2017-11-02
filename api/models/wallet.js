module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    address: DataTypes.STRING
  });

  Wallet.associate = function ({ User, Wallet }) {
    Wallet.belongsTo(User);
  }

  return Wallet;
};