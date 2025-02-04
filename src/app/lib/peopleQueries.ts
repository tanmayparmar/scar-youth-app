import { gql } from '@apollo/client';

// Example query to fetch people
export const GET_PEOPLES = gql`
  query {
    people {
      id
      photo {
        id
        type
        title
      }
      first_name
      last_name
      date_of_birth
    }
  }
`;
