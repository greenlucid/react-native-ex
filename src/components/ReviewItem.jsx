import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

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

const ReviewButtons = ({ review }) => {
  const history = useHistory();
  const [ deleteReviewMutate ] = useMutation(DELETE_REVIEW)
  const apolloClient = useApolloClient();
  
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      backgroundColor: theme.colors.textBar
    },
    emptySpace: {
      padding: 10
    },
    gotoButton: {
      backgroundColor: theme.colors.tagBackground,
      alignItems: 'center',
      borderRadius: 10
    },
    deleteButton: {
      backgroundColor: 'red',
      alignItems: 'center',
      borderRadius: 10
    },
    text: {
      padding: 13,
      color: theme.colors.textBar,
      textAlignVertical: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    }
  });

  const handleGoto = () => {
    history.push(`/repository/${review.repositoryId}`)
  };

  const deleteReviewHandler = async () => {
    await deleteReviewMutate({ variables: { id: review.id } });
    apolloClient.resetStore();
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review? There is no going back.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteReviewHandler() }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.gotoButton} onPress={handleGoto}>
        <Text fontSize='title' bold style={style.text}>View repository</Text>
      </TouchableOpacity>
      <View style={style.emptySpace}/>
      <TouchableOpacity style={style.deleteButton} onPress={handleDeletePress}>
        <Text fontSize='title' bold style={style.text}>Delete review</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReviewItem = ({ item, owned }) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.textBar
    },
    reviewContainer: {
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
      <View style={style.reviewContainer}>
        <Score score={item.rating} />
        <View style={style.textSide}>
          <Text bold fontSize='title'>
            {owned ? item.repository.fullName : item.user.username}
          </Text>
          <Text color='secondary' fontSize='subheading'>
            {showDate()}
          </Text>
          <Text>
            {item.text}
          </Text>
        </View>
      </View>
      {owned && <ReviewButtons review={item}/>}
    </View>
  );
};

export default ReviewItem;