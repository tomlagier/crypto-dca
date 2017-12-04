module.exports = {
  up(migration, Sequelize) {
    return migration.addColumn(
      'Users',
      'avatar',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },
  down: (migration) => {
    return migration.removeColumn('Users', 'avatar');
  }
}