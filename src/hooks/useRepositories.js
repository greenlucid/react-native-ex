import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order = 'latest') => {
  const [repositories, setRepositories] = useState(undefined);

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

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {...orderByArgument(order)}
  });

  const wrappedRefetch = (order) => {
    refetch({ variables: {...orderByArgument(order)} });
  }

  const updateRepositories = () => {
    if (data && !loading) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    updateRepositories();
  }, [data]);

  return { repositories, loading, wrappedRefetch };
};

export default useRepositories;