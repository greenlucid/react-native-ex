import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    return result;
  };

  return [signUp, result];
};

export default useSignUp;