const fetch = require('node-fetch');

const user = 'tomlagier';
const password = 'test-password';

module.exports = {
  async login() {
    var data = `username=${user}&password=${password}`
    const settings = {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded',
      }),
      body: data
    }

    const { ok } = await fetch('/login', settings)
    return ok;
  },

  async logout() {
    const settings = {
      method: 'POST'
    }
    const { ok } = await fetch('/logout', settings);
    return ok;
  }
}