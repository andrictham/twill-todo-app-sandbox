import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ListDetailScreen from './ListDetailScreen';

import { RectButton } from 'react-native-gesture-handler';
const { FlatList } = require('react-navigation');
import SwipeableRow from '../components/SwipeableRow';
import mockLists from '../../utils/data/mockLists';
import mockListStates from '../../utils/data/mockListStates';

const RowContents = ({ item, onPress }) => (
  <RectButton style={styles.rowItem} onPress={() => onPress()}>
    <Text style={styles.nameText}>{item.name}</Text>
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

interface ListsScreenProps {
  lists: object;
  listStates: object;
  items: object;
}

const ListsScreen = (props: ListsScreenProps) => {
  const { lists, listStates, items } = props;
  console.tron.log(items);

  return (
    <View style={styles.view}>
      <FlatList
        data={items}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{listStates[0].name}</Text>
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
                props.navigation.navigate('ListDetail', {
                  name: item.name,
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
};

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
  nameText: {
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

const mapStateToProps = (state: State) => {
  const lists = [];
  const listStates = [];
  let items = [];

  for (const key in state.lists) {
    lists.push(state.lists[key]);
  }

  for (const key in state.listStates) {
    listStates.push(state.listStates[key]);
  }

  for (const key in state.items) {
    items.push(state.items[key]);
  }
  items = items.filter(item => item.listID === '1' && item.listStateID === '1');

  return {
    lists,
    listStates,
    items,
  };
};

export default connect(mapStateToProps)(ListsScreen);
