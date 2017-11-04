module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
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