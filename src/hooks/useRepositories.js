import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order = 'latest', search = '') => {
  const [repositories, setRepositories] = useState(undefined);
  const first = 3;

  const orderByArgument = (order) => {
    switch (order) {
      case 'highestRating':
        return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
      case 'lowestRating':
        return ({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
      case 'latest':
      default:
        return ({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
    }
  }

  const { data, loading, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { ...orderByArgument(order), searchKeyword: search, first }
  });

  const handleFetchMore = (order, search) => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: { 
        ...orderByArgument(order),
        searchKeyword: search,
        first,
        after: data.repositories.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  }

  const wrappedRefetch = (order, search) => {
    refetch({ variables: { ...orderByArgument(order), searchKeyword: search, first } });
  }

  const updateRepositories = () => {
    if (data && !loading) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    updateRepositories();
  }, [data, loading]);

  return { repositories, loading, wrappedRefetch, fetchMore: handleFetchMore };
};

export default useRepositories;