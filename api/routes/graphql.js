const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const logger = require('../helpers/logger');
const { NODE_ENV } = process.env;

module.exports = function (app) {
  const schema = require('../schema');

  app.use('/graphql', bodyParser.json(), (req, res) =>
    graphqlExpress({
      schema,
      context: {user: req.user}
    })(req, res)
  );

  if (NODE_ENV === 'development') {
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }

  logger.info(`Running a GraphQL API server at /graphql`);
}