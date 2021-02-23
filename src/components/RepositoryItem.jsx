import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

import theme from '../theme';
import Text from './Text';

const ProfilePicture = ({ imageUrl }) => {
  const style = StyleSheet.create({
    avatarPicture: {
      width: 50,
      height: 50,
      borderRadius: 10,
    },
    avatarContainer: {
      paddingTop: 10,
      paddingLeft: 10
    }
  });

  return (
    <View style={style.avatarContainer}>
      <Image
        style={style.avatarPicture}
        source={{uri: imageUrl}}
      />
    </View>
  );
};

const Tag = ({ text }) => {
  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row'
    },
    tagContainer: {
      flexShrink: 1,
      backgroundColor: theme.colors.tagBackground,
      paddingHorizontal: 3,
      alignSelf: 'flex-start',
      borderRadius: 4,
      marginVertical: 3
    },
    spaceContainer: {
      flexGrow: 2
    },
    text: {
      padding: 5,
      color: theme.colors.textBar
    }
  });
  return (
    <View style={style.container}>
      <View style={style.tagContainer}>
        <Text bold style={style.text} fontSize='tag' testID="language" >
          {text}
        </Text>
      </View>
      <View style={style.spaceContainer}/>
    </View>
  );
};

const Brand = ({ item }) => {
  const style = StyleSheet.create({
    brandContainer: {
      padding: 10,
      paddingRight: 20,
      flexDirection: 'column',
      flex: 1
    },
    text: {
      padding: 2,
      paddingBottom: 3,
      marginBottom: 3
    }
  });
  return (
    <View style={style.brandContainer}>
      <Text bold fontSize="title" style={style.text} testID="fullName">
        {item.fullName}
      </Text>
      <Text color="secondary" fontSize="tag" style={style.text} testID="description">
        {item.description}
      </Text>
      <Tag text={item.language}/>
    </View>
  );
};

const UpperCard = ({ item }) => {
  const style = StyleSheet.create({
    upperCard: {
      display: 'flex',
      flexDirection: 'row'
    }
  });
  return (
    <View style={style.upperCard}>
      <ProfilePicture imageUrl={item.ownerAvatarUrl}/>
      <Brand item={item}/>
    </View>
  );
};

const Stat = ({ count, label }) => {
  const style = StyleSheet.create({
    statItem: {
      padding: 5
    },
    statCount: {
      textAlign: "center"
    },
    statLabel: {
      textAlign: "center",
      padding: 5
    }
  });

  const shownCount = (count) => {
    if (count >= 1000000) {
      return `${String(count)[0]}.${String(count)[1]}M`;
    } else if (count >= 1000) {
      return `${String(count)[0]}.${String(count)[1]}k`;
    } else return String(count);
  };

  const base = label.toLowerCase();
  const ids = {
    view: `${base}`,
    count: `${base}Count`,
    label: `${base}Label`
  }

  return (
    <View style={style.statItem} testID={ids.view}>
      <Text bold style={style.statCount} fontSize="tag" testID={ids.count}>
        {shownCount(count)}
      </Text>
      <Text color="secondary" fontSize="subheading" style={style.statLabel} testID={ids.label}>
        {label}
      </Text>
    </View>
  );
};

const StatsBar = ({ item }) => {
  const style = ({
    statBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  });
  return (
    <View style={style.statBar}>
      <Stat count={item.stargazersCount} label="Stars"/>
      <Stat count={item.forksCount} label="Forks"/>
      <Stat count={item.reviewCount} label="Reviews"/>
      <Stat count={item.ratingAverage} label="Rating"/>
    </View>
  );
};

const UrlButton = ({ url }) => {
  const style = StyleSheet.create({
    buttonContainer: {
      flexShrink: 1,
      backgroundColor: theme.colors.tagBackground,
      paddingHorizontal: 3,
      borderRadius: 4,
      marginVertical: 3,
      paddingVertical: 5
    },
    text: {
      padding: 5,
      color: theme.colors.textBar,
      textAlign: 'center'
    }
  });

  const onPress = () => {
    Linking.openURL(url);
  }

  return (
    <TouchableOpacity onPress={onPress} style={style.buttonContainer}>
      <Text style={style.text} bold fontSize="title">
        Open in GitHub
      </Text>
    </TouchableOpacity>
  );
};

const RepositoryItem = ({ item, withButton }) => {
  const style = ({
    fullCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.cardBackground
    }
  });
  if (!item) {
    return null;
  }
  return (
    <View style={style.fullCard}>
      <UpperCard item={item}/>
      <StatsBar item={item}/>
      {withButton && <UrlButton url={item.url}/>}
    </View>
  );
};

export default RepositoryItem;