import { ApolloClient, createNetworkInterface } from 'react-apollo';
// import { InMemoryCache } from 'apollo-cache-inmemory';

export default new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8088/graphql',
    opts: { credentials: 'include' }
  })
});