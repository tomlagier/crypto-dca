module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING(32),
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return Session;
};