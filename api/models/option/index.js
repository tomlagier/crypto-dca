const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Option.associate = function ({ User, Option }) {
    Option.User = Option.belongsTo(User);
  }

  return Option;
};