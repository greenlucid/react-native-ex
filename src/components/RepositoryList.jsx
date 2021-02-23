import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const TouchableItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RepositoryItem item={item}/>
    </TouchableOpacity>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const onPress = (id) => () => {
    history.push(`/repository/${id}`)
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableItem item={item} onPress={onPress(item.id)} />
      )}
    />
  );
}

const OrderDropdown = ({ onChange }) => {

  const items = [
    { label: 'Latest', value: 'latest' },
    { label: 'Highest rating', value: 'highestRating' },
    { label: 'Lowest rating', value: 'lowestRating' },
  ];

  return (
    <RNPickerSelect 
      onValueChange={onChange}
      items={items}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const { repositories, wrappedRefetch } = useRepositories(order);

  const onChange = (value) => {
    setOrder(value);
    wrappedRefetch(order);
  };

  return (
    <View>
      <OrderDropdown onChange={onChange} />
      <RepositoryListContainer repositories={repositories}/>
    </View>
  );
};

export default RepositoryList;