module.exports = {
  up(migration, Sequelize) {
    return migration.changeColumn('Coins', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },
  down(migration, Sequelize) {
    return migration.changeColumn('Coins', 'code', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
