module.exports = {
  async up(migration) {
    await migration.removeConstraint(
      'Options',
      'Options_pkey'
    );
    return migration.addConstraint(
      'Options',
      ['UserId', 'name'],
      {
        type: 'PRIMARY KEY',
        name: 'Options_pkey'
      }
    );
  },
  async down(migration) {
    await migration.removeConstraint(
      'Options',
      'Options_pkey'
    );
    return migration.addConstraint('Options', ['id'], {
      type: 'PRIMARY KEY',
      name: 'Options_pkey'
    });
  }
};
