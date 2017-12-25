import { ApolloClient, createNetworkInterface } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8088/graphql',
    opts: { credentials: 'include' }
  })
});

export default client;
export const mutate = client.mutate;
export const query = client.query;