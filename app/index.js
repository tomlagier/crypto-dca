const express = require('express');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const PORT = 8087;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);
console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);

