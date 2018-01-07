const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => v4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Option.associate = function({ User, Option }) {
    Option.User = Option.belongsTo(User, {
      foreignKey: {
        primaryKey: true
      }
    });
  };

  return Option;
};
