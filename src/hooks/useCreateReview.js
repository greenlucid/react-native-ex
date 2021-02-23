import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const result = await mutate({ variables: { ownerName, repositoryName, rating, text } });
    apolloClient.resetStore();
    return result;
  };

  return [createReview, result];
};

export default useCreateReview;