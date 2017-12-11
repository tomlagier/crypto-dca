const tables = [
  'Users',
  'Wallets',
  'Coins',
  'Transactions',
  'Options'
];

module.exports = {
  up(migration, Sequelize) {
    const addIsDeleted = table => migration.addColumn(table, 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    return tables.map(addIsDeleted)
  },
  down: migration => {
    const removeIsDeleted = table => migration.removeColumn(table, 'isDeleted');
    return tables.map(removeIsDeleted);
  }
}