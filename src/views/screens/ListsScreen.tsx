import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import ListDetailScreen from './ListDetailScreen';

import { RectButton } from 'react-native-gesture-handler';
const { FlatList } = require('react-navigation');

import SwipeableRow from '../components/SwipeableRow';

const RowContents = ({ item, onPress }) => (
  <RectButton style={styles.rowItem} onPress={() => onPress()}>
    <Text style={styles.titleText}>{item.title}</Text>
    <Text numberOfLines={1} style={styles.descriptionText}>
      {item.description || 'No description'}
    </Text>
    <Text style={styles.quantityText}>{item.caption || ''}</Text>
  </RectButton>
);

const Row = ({ item, onPress }) => {
  return (
    <SwipeableRow>
      <RowContents item={item} onPress={onPress} />
    </SwipeableRow>
  );
};

export default class ListsScreen extends Component {
  state = {
    items: [
      {
        title: '🥜 Almond Milk',
        description: 'Nutty Bruce. Unsweetened preferred',
      },
      {
        title: '🥥 Nutty Bruce Coconut Milk',
        description: 'Nutty Bruce',
      },
      {
        title: '🥣 Paleo Mix',
        description: 'CeresOrganics',
      },
      {
        title: '🥛 Soy Milk',
        description: 'Pacific',
      },
      {
        title: '🍃 Baby spinach',
        description: '',
      },
      {
        title: '🥑 Avocados',
        description: 'Hass preferred!',
      },
      {
        title: '🍌 Bananas',
        description: '',
      },
      {
        title: '⚪️ Scallops',
        description: 'Frozen Hokkaido scallops',
      },
      {
        title: '🍒 Cherries',
        description: '',
      },
      {
        title: '🥭 Mangos',
        description: '',
      },
      {
        title: '🍤 Prawns',
        description: 'Make sure they are fresh!',
      },
      {
        title: '🥬 Green leafy vegetables',
        description: 'Siew Pak Choi?',
      },
      {
        title: '🌱 Leeks',
        description: '',
      },
      {
        title: '⬜️ Tofu',
        description: 'Silken organic',
      },
      {
        title: '🍅 Tomatoes',
        description: '',
      },
      {
        title: '🥔 Potatoes',
        description: '',
      },
      {
        title: '🥕 Carrots',
        description: '',
      },
      {
        title: '🎃 Butternut squash / pumpkin',
        description: '',
      },
      {
        title: '🍆 Eggplant',
        description: '',
      },
      {
        title: '🍠 Sweet potatoes',
        description: '',
      },
    ],
  };
  render() {
    return (
      <View style={styles.view}>
        <FlatList
          data={this.state.items}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>To Buy</Text>
            </View>}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // tslint:disable-next-line:jsx-no-lambda
          renderItem={({ item, index }) => {
            return (
              <Row
                item={item}
                index={index}
                onPress={() => {
                  this.props.navigation.navigate('ListDetail', {
                    title: item.title,
                    description: item.description,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return `item ${index}`;
          }}
          style={styles.flatList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 0,
  },
  listHeader: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  listHeaderText: {
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 21,
  },
  flatList: {
    marginTop: 25,
  },
  rowItem: {
    flex: 1,
    height: 80,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    color: '#666',
    backgroundColor: 'transparent',
  },
  quantityText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 16,
    color: '#666',
  },
});
