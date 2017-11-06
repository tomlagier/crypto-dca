const express = require('express');
const bodyParser = require('body-parser');
const createSchema = require('../schema');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const logger = require('./logger');

module.exports = {
  start({
    port = 8088,
    db = require('../models')
  } = {}) {
    const app = express();

    app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: createSchema(db)
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