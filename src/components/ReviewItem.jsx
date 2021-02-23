import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import theme from '../theme';
import Text from './Text';

const Score = ({ score }) => {
  const style = StyleSheet.create({
    circle: {
      width: 50,
      height: 50,
      borderRadius: 100,
      borderColor: theme.colors.tagBackground,
      borderWidth: 3,
      marginTop: 20,
      marginLeft: 5,
      display: 'flex',
      flexDirection: 'column'
    },
    number: {
      color: theme.colors.tagBackground,
      fontSize: theme.fontSizes.title,
      textAlign: 'center',
      textAlignVertical: 'center',
      flexGrow: 1
    }
  });

  return (
    <View style={style.circle}>
      <Text style={style.number} bold>
        {score}
      </Text>
    </View>
  );
};

const ReviewItem = ({ item }) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.colors.textBar
    },
    textSide: {
      flexShrink: 1,
      display: 'flex',
      flexDirection: 'column',
      margin: 10
    }
  });

  const showDate = () => {
    const justDate = item.createdAt.substring(0, 10);
    const betterFormat = 
      `${justDate.substring(8, 10)}.${justDate.substring(5, 7)}.${justDate.substring(0, 4)}`
    return betterFormat;
  };

  return (
    <View style={style.container}>
      <Score score={item.rating} />
      <View style={style.textSide}>
        <Text bold fontSize='title'>
          {item.user.username}
        </Text>
        <Text color='secondary' fontSize='subheading'>
          {showDate()}
        </Text>
        <Text>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;