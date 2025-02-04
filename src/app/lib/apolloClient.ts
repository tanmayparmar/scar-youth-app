import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';

const DIRECTUS_GRAPHQL_URL = process.env.NEXT_PUBLIC_DIRECTUS_GRAPHQL_URL;

const httpLink = new HttpLink({
  uri: DIRECTUS_GRAPHQL_URL,
  credentials: 'include',
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});
