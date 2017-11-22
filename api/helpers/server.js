const express = require('express');
const cors = require('cors');

module.exports = {
  start({
    port = 8088
  } = {}) {
    const app = express();

    app.use(cors({
      origin: 'http://localhost:8087',
      credentials: true
    }));
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