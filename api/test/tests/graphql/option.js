const { expect } = require('chai');
const { describe, it, before, after } = require('mocha');
const fetch = require('node-fetch');
const runFileMigration = require('../../../helpers/run-file-migration');

describe('option query', () => {
  let migrate, db;
  before(async () => {
    db = require('../setup')();
    migrate = runFileMigration('test-data.sql', db);
    await migrate.up();
  });

  it('should be able to query all options', async () => {
    const query = encodeURIComponent(`
      {
        options {
          id,
          name,
          value
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { options }} = await resp.json();
    expect(options).to.deep.equal([
      {
        "id": "1",
        "name": "invest_interval",
        "value": "100"
      },
      {
        "id": "2",
        "name": "auto_rebalance",
        "value": "true"
      }
    ])
  });

  it('should be able to look a option up by ID', async () => {
    const query = encodeURIComponent(`
      {
        option(id:"1") {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {option}} = await resp.json();
    expect(option).to.deep.equal({
      name: 'invest_interval'
    })
  });

  it('should be able to search for an option by key', async () => {
    const query = encodeURIComponent(`
      {
        optionSearch(query:"interval") {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {optionSearch}} = await resp.json();
    expect(optionSearch).to.deep.equal([
      {
        "name": "invest_interval"
      }
    ])
  });

  it('should be able to search for an option by value', async () => {
    const query = encodeURIComponent(`
      {
        optionSearch(query:"true") {
          name
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {optionSearch}} = await resp.json();
    expect(optionSearch).to.deep.equal([
      {
        "name": "auto_rebalance"
      }
    ])
  });

  after(async () => {
    await migrate.down();
  })
})