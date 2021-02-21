import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import { Link } from 'react-router-native';

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

const Tab = ({ label, path }) => {
  return (
    <View>
      <Link to={path} replace>
        <Text style={styles.flexItem}>{label}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab label="Repositories" path="/"/>
        <Tab label="Sign in" path="/signin"/>
      </ScrollView>
    </View>
  );
};

export default AppBar;