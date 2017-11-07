const models = require('../models');
const { writeFile } = require('fs');

async function createTables() {
  const sqlLines = [];

  const { NODE_ENV } = process.env;

  if (!['development', 'test'].includes(NODE_ENV)) {
    return Promise.reject();
  }

  const modelKeys = [
    'User',
    'Wallet',
    'Coin',
    'Session',
    'Transaction',
    'Option'
  ];

  for (let modelKey of modelKeys) {
    await models[modelKey].sync({
      force: true,
      logging: (message) => {
        let line = message.replace('Executing (default): ', '').trim();
        if (line.substr(-1) !== ';') {
          line += ';';
        }

        sqlLines.push(line);
      }
    })
  }

  const sql = sqlLines.join('\n');
  writeFile('./migrations/initial-tables.sql', sql, err => {
    if (err) console.error(err)
    models.sequelize.close();
  });
}

createTables();