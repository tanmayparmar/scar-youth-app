import { authentication, createDirectus, graphql } from '@directus/sdk';

export const createDirectusClient = <T>() => {
  return createDirectus<T>(process.env.DIRECTUS_URL!)
    .with(
      authentication('cookie', { credentials: 'include', autoRefresh: true })
    )
    .with(graphql({ credentials: 'include' }));
};
