import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import { GET_MY_REVIEWS } from '../graphql/queries';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = ({ reviews }) => {
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} owned />}
    />
  );
};

const MyReviews = () => {
  const { data, loading } = useQuery(GET_MY_REVIEWS);

  if (loading || !data.authorizedUser || !data.authorizedUser.reviews) {
    return null;
  }
  
  return (
    <MyReviewsContainer reviews={data.authorizedUser.reviews} />
  );
};

export default MyReviews;