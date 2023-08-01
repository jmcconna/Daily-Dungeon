import { gql } from '@apollo/client';

// Login //
export const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

// Logout // 
export const LOGOUT_MUTATION = gql`
  mutation logoutUser {
    logoutUser {
      success
    }
  }
`;

// Create User // 
export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
