const { expect } = require('chai');
const { describe, it } = require('mocha');
const fetch = require('node-fetch');
const { name } = require('../../helpers/sort');

describe('option query', () => {

  it('should be able to query all options', async () => {
    const query = encodeURIComponent(`
      {
        options {
          name,
          value
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const { data: { options }} = await resp.json();
    expect(
      options.sort(name)
    ).to.deep.equal([
      {
        "name": "auto_rebalance",
        "value": "true"
      },
      {
        "name": "invest_interval",
        "value": "100"
      }
    ])
  });

  it('should be able to look a option up by ID', async () => {
    const idQuery = encodeURIComponent(`
      {
        optionSearch(query:"interval") {
          id
        }
      }
    `);
    const resp = await fetch(`http://localhost:8088/graphql?query=${idQuery}`)
    const { data: { optionSearch: [{id}] } } = await resp.json();

    const query = encodeURIComponent(`
      {
        option(id:"${id}") {
          name
        }
      }
    `);
    const resp2 = await fetch(`http://localhost:8088/graphql?query=${query}`)
    const {data: {option}} = await resp2.json();
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
})