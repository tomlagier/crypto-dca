const express = require('express');
const bodyParser = require('body-parser');
const schema = require('./schema');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const PORT = 8088;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);
console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);