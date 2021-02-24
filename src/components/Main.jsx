import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/repository/:id">
          <SingleRepository />
        </Route>
        <Route path="/createReview">
          <CreateReview />
        </Route>
        <Route path="/myReviews">
          <MyReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;