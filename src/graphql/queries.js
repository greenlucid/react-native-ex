import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!, $first: Int!, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          id
          fullName
          description
          language
          reviewCount
          ratingAverage
          stargazersCount
          forksCount
          ownerAvatarUrl
        }
      }
      pageInfo {
        hasNextPage
        totalCount
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      reviewCount
      ratingAverage
      stargazersCount
      forksCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_MY_REVIEWS = gql`
  query {
    authorizedUser {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;