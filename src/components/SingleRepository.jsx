import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';

import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} withButton/>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ reviews }) => {

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : []
  
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={ReviewItem}
    />
  );
};

const SingleRepositoryContainer = ({ item }) => {
  return (
    <View>
      <RepositoryInfo repository={item}/>
      <ReviewList reviews={item.reviews}/>
    </View>
  );
};

const SingleRepository = () => {
  const params = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY,{ 
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return null;
  }

  else {
    return (
      <SingleRepositoryContainer item={data.repository} />
    );
  }
  
};

export default SingleRepository;