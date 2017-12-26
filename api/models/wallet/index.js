const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
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
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Wallet.associate = function({ User, Wallet }) {
    Wallet.belongsTo(User);
  };

  return Wallet;
};
