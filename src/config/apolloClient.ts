import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = ApolloLink.from([new RetryLink(), new HttpLink({ uri: '/graphql' })]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
});

export default client;
