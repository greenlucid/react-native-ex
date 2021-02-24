import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import theme from '../theme';
import { Link } from 'react-router-native';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    paddingBottom: Constants.statusBarHeight
  },
  flexItem : {
    fontSize: theme.fontSizes.bar,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    color: theme.colors.textBar,
    marginHorizontal: theme.margins.appbar
  }
  // ...
});

const Tab = ({ label, path, action }) => {
  if (path) {
    return (
      <View>
        <Link to={path} replace>
          <Text style={styles.flexItem}>{label}</Text>
        </Link>
      </View>
    );
  } else if (action) {
    return (
      <TouchableWithoutFeedback onPress={action}>
        <Text style={styles.flexItem}>{label}</Text>
      </TouchableWithoutFeedback>
    );
  }
};

const AppBar = () => {
  const authUser = useQuery(AUTHORIZED_USER);
  const [signedIn, setSignedIn] = useState(false);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (authUser.data && !authUser.loading) {
      if (authUser.data.authorizedUser === null) {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    }
  }, [authUser]);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab label="Repositories" path="/"/>
        {signedIn && <Tab label="Create review" path="/createReview"/>}
        {signedIn && <Tab label="My reviews" path="/myReviews"/>}
        {signedIn
          ? <Tab label="Sign out" action={signOut} /> 
          : <Tab label="Sign in" path="/signin"/>
        }
        {!signedIn && <Tab label="Sign up" path="/signup"/>}
      </ScrollView>
    </View>
  );
};

export default AppBar;