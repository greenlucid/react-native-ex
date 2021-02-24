import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    marginBottom: 215
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const TouchableItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RepositoryItem item={item}/>
    </TouchableOpacity>
  );
};

export const RepositoryListContainer = ({ repositories, onEndReached }) => {
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      style={styles.listContainer}
    />
  );
}

const OrderDropdown = ({ onChange }) => {
  const style = StyleSheet.create({
    picker: {
      color: theme.colors.textPrimary
    },
    text: {
      paddingLeft: 20,
      marginVertical: 20
    }
  });

  const items = [
    { label: 'Latest', value: 'latest' },
    { label: 'Highest rating', value: 'highestRating' },
    { label: 'Lowest rating', value: 'lowestRating' },
  ];

  const [ item, setItem ] = useState(items[0])

  const updateItem = (value) => {
    setItem(items.find(item => item.value === value));
  };

  return (
    <RNPickerSelect
    style={style.picker}
      onValueChange={(value) => {
        onChange(value);
        updateItem(value);
      }}
      items={items}
    >
      <Text style={style.text} fontSize='title'>{item.label}</Text>
    </RNPickerSelect>
  );
};

const SearchRepository = ({ onChange, search }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChange}
      value={search}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { repositories, wrappedRefetch, fetchMore } = useRepositories(order, search);

  const onChangeOrder = (value) => {
    setOrder(value);
    wrappedRefetch(order, search);
  };

  const onChangeSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    wrappedRefetch(order, debouncedSearch);
  }, [debouncedSearch]);

  const onEndReached = () => {
    console.log("end of the line");
    fetchMore(order, debouncedSearch);
  };

  return (
    <View>
      <SearchRepository onChange={onChangeSearch} search={search} />
      <OrderDropdown onChange={onChangeOrder} />
      <RepositoryListContainer repositories={repositories} onEndReached={onEndReached}/>
    </View>
  );
};

export default RepositoryList;