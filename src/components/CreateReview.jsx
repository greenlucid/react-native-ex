import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput as NativeTextInput } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';


import useCreateReview from '../hooks/useCreateReview';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number('Rating is a number')
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating score is required'),
  text: yup
    .string()
});

const CreateReviewButton = ({ onSubmit }) => {
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
        <Text style={styles.text} bold>Create review</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateReviewForm = ({ onSubmit }) => {
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
      <FormikTextInput style={styles.form} name="ownerName" 
        placeholder="Owner name" testID="ownerNameField"
      />
      <FormikTextInput style={styles.form} name="repositoryName" 
        placeholder="Repository name" testID="repositoryNameField"
      />
      <FormikTextInput style={styles.form} name="rating" keyboardType="number-pad"
        placeholder="Rating score" testID="ratingField"
      />
      <FormikTextInput style={styles.form} name="text" multiline
        placeholder="Write your review..." testID="textField"
      />
      <CreateReviewButton onSubmit={onSubmit}/>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  );
};

const CreateReview = () => {
  const [ createReview ] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({ ownerName, repositoryName, rating: Number(rating), text });
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log('Something wrong happened creating the review', e);
    }
  };

  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;