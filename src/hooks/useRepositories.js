import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState(undefined);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES);

  const updateRepositories = () => {
    if (data && !loading) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    updateRepositories();
  }, [data]);

  return { repositories, loading, refetch };
};

export default useRepositories;