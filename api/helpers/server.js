const express = require('express');

module.exports = {
  start({
    port = 8088
  } = {}) {
    const app = express();

    require('../routes')(app);

    this.app = app;
    let resolve;
    const listeningPromise = new Promise(res => resolve = res);
    this.server = app.listen(port, () => resolve());
    return listeningPromise;
  },
  stop() {
    this.server.close();
  }
}