import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
      id
      repositoryId
      text
      rating
      createdAt
      user {
        id
        username
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`