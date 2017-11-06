const express = require('express');
const bodyParser = require('body-parser');
const schema = require('../schema');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const logger = require('./logger');

module.exports = {
  start(port = 8088) {
    const app = express();

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

    app.listen(port);
    logger.info(`Running a GraphQL API server at localhost:${port}/graphql`);

    return this.app = app;
  },
  stop() {
    this.app.close();
  }
}