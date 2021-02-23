import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { ref } from 'yup';

const initialValues = {
  username: '',
  password: '',
  repeatPassword: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must contain between 1 and 30 characters')
    .max(30, 'Username must contain between 1 and 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must contain between 5 and 50 characters')
    .max(50, 'Password must contain between 5 and 50 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .min(5, 'Password must contain between 5 and 50 characters')
    .max(50, 'Password must contain between 5 and 50 characters')
    .oneOf([ref('password'), null], 'Passwords do not match')
    .required('Write the password again! HAhahahaa')
});

const SignUpButton = ({ onSubmit }) => {
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
        <Text style={styles.text} bold>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput style={styles.form} name="repeatPassword" 
        placeholder="Repeat password" secureTextEntry testID="repeatPasswordField"
      />
      <SignUpButton onSubmit={onSubmit}/>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [ signIn ] = useSignIn();
  const [ signUp ] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      console.log("Correct sign-up!", data);
      await signIn({ username, password });
      console.log("Correct sign-in!", data);
      history.push('/');
    } catch (e) {
      console.log('incorrect login / signup', e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;