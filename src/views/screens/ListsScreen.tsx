import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
const { FlatList } = require('react-navigation');

import SwipeableRow from '../components/SwipeableRow';

const RowContents = ({ item }: any) => (
  <RectButton style={styles.rowItem} onPress={() => Alert.alert(item.title)}>
    <Text style={styles.titleText}>{item.title}</Text>
    <Text numberOfLines={1} style={styles.descriptionText}>
      {item.description || 'No description'}
    </Text>
    <Text style={styles.quantityText}>
      {item.quantity} {'❭'}
    </Text>
  </RectButton>
);

const Row = ({ item }: any) => {
  return (
    <SwipeableRow>
      <RowContents item={item} />
    </SwipeableRow>
  );
};

export default class ListsScreen extends Component {
  state = {
    items: [
      {
        title: '🥜 Almond Milk',
        quantity: '1 carton',
        description: 'Nutty Bruce. Unsweetened preferred',
      },
      {
        title: '🥥 Nutty Bruce Coconut Milk',
        quantity: '1 carton',
        description: 'Nutty Bruce',
      },
      {
        title: '🥣 Paleo Mix',
        quantity: '2 packs',
        description: 'CeresOrganics',
      },
      {
        title: '🥛 Soy Milk',
        quantity: '1 carton',
        description: 'Pacific',
      },
      {
        title: '🍃 Baby spinach',
        quantity: '1 pack',
        description: '',
      },
      {
        title: '🥑 Avocados',
        quantity: '6',
        description: 'Hass preferred!',
      },
      {
        title: '🍌 Bananas',
        quantity: '6',
        description: '',
      },
      {
        title: '⚪️ Scallops',
        quantity: '1 box',
        description: 'Frozen Hokkaido scallops',
      },
      {
        title: '🍒 Cherries',
        quantity: '1 box',
        description: '',
      },
      {
        title: '🥭 Mangos',
        quantity: '2',
        description: '',
      },
      {
        title: '🍤 Prawns',
        quantity: '8',
        description: 'Make sure they are fresh!',
      },
      {
        title: '🥬 Green leafy vegetables',
        quantity: '1 pack',
        description: 'Siew Pak Choi?',
      },
      {
        title: '🌱 Leeks',
        quantity: '1',
        description: '',
      },
      {
        title: '⬜️ Tofu',
        quantity: '1 box',
        description: 'Silken?',
      },
      {
        title: '🍅 Tomatoes',
        quantity: '4',
        description: '',
      },
      {
        title: '🥔 Potatoes',
        quantity: '1 bag',
        description: '',
      },
      {
        title: '🥕 Carrots',
        quantity: '1 bag',
        description: '',
      },
      {
        title: '🎃 Butternut squash / pumpkin',
        quantity: '1',
        description: '',
      },
      {
        title: '🍆 Eggplant',
        quantity: '1',
        description: '',
      },
      {
        title: '🍠 Sweet potatoes',
        quantity: '1',
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
            </View>
          }
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // tslint:disable-next-line:jsx-no-lambda
          renderItem={({ item, index }) => <Row item={item} index={index} />}
          keyExtractor={(item, index) => `message ${index}`}
          style={styles.flatList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 35,
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
