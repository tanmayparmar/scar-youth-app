'use server';
import { AUTH_USER, COOKIE_NAME } from 'app/constant';
import { cookies } from 'next/headers';
import { LOGIN_MUTATION } from './mutations';
import { getClient } from './apolloClient';
import { HttpLink } from '@apollo/client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  access_token?: string;
  refresh_token?: string;
}

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_USER);
  cookieStore.delete(COOKIE_NAME);
};

export const userSession = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  let user: User = {};

  if (cookie?.value) {
    try {
      const token = JSON.parse(cookie.value);
      if (token?.data?.access_token && token?.data?.refresh_token) {
        user = {
          access_token: token.data.access_token,
          refresh_token: token.data.refresh_token,
        };
      }
    } catch (error) {
      console.error('Failed to parse cookie:', error);
    }
  }

  return user;
};

export const directusLogin = async (
  credentials: LoginCredentials
): Promise<User> => {
  const DIRECTUS_URL = process.env.DIRECTUS_URL;
  if (!DIRECTUS_URL) {
    throw new Error('Environment variable DIRECTUS_URL is not set');
  }

  const email = credentials.email;
  const password = credentials.password;
  const client = getClient();
  try {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_DIRECTUS_SYSTEM_GRAPHQL_URL!,
    });
    
    client.setLink(httpLink);
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });

    if (!data || !data.auth_login) {
      const message = `Login failed with status ${data.status}: ${data.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    const user = data.auth_login.access_token;
    const formatedData = JSON.stringify(user);
    const cookie = await cookies();
    cookie.set(COOKIE_NAME, formatedData);
    return user;
  } catch (error: any) {
    console.error('Login failed:', error.message);
    throw new Error(error.message || 'Unable to complete login process.');
  }
};
