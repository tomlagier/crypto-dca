const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const logger = require('./logger');

module.exports = {
  start({
    port = 8088
  } = {}) {
    const app = express();
    const schema = require('../schema');

    app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema
    }));
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

    logger.info(`Running a GraphQL API server at localhost:${port}/graphql`);
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