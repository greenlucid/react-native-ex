import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must contain between 3 and 16 characters')
    .max(16, 'Username must contain between 3 and 16 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must contain between 8 and 32 characters')
    .max(32, 'Password must contain between 8 and 32 characters')
    .required('Password is required'),
});

const SignInButton = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10
    },
    button: {
      backgroundColor: theme.colors.tagBackground,
      alignContent: 'center',
      borderRadius: 10
    },
    text: {
      color: theme.colors.textBar,
      fontSize: theme.fontSizes.bar,
      alignSelf: 'center',
      paddingVertical: 10
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.text} bold>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignInForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    form: {
      padding: 15,
      fontSize: theme.fontSizes.tag,
      borderColor: theme.colors.background,
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 10,
      textAlignVertical: 'center'
    },
    container: {
      backgroundColor: theme.colors.cardBackground,
      padding: 10
    }
  });
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.form} name="username" 
        placeholder="Username" testID="usernameField"
      />
      <FormikTextInput style={styles.form} name="password" 
        placeholder="Password" secureTextEntry testID="passwordField"
      />
      <SignInButton onSubmit={onSubmit}/>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [ signIn ] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log("Correct login!", data);
      history.push('/');
    } catch (e) {
      console.log('incorrect login', e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;