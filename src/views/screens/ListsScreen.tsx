import React, { Component } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import { FlatList, NavigationScreenProp } from 'react-navigation';

import ListDetailScreen from './ListDetailScreen';
import SwipeableRow from '../components/SwipeableRow';
import mockLists from '../../utils/data/mockLists';
import mockListStates from '../../utils/data/mockListStates';
import sortListStatesByDisplayRank from '../../utils/sorting';

interface PageProps {
  items: Array<{
    id: string;
    name: string;
    displayRank: number;
  }>;
  listState: {
    id: string;
    listID: string;
    name: string;
    displayRank: number;
  };
  listStates: Array<{
    id: string;
    listID: string;
    name: string;
    displayRank: number;
  }>;
  tabLabel: {
    label: string;
  };
  navigation: NavigationScreenProp<any, any>;
}

const Page = (props: PageProps) => {
  const { listState, listStates, items, navigation } = props;
  const currentList;
  return (
    <FlatList
      data={items}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // tslint:disable-next-line:jsx-no-lambda
      renderItem={({ item, index }) => {
        return (
          <Row
            item={item}
            index={index}
            onPress={() => {
              navigation.navigate('ListDetail', {
                name: item.name,
                description: item.description,
              });
            }}
            listState={listState}
            listStates={listStates}
          />
        );
      }}
      keyExtractor={(item, index) => {
        return `item ${index}`;
      }}
      style={styles.flatList}
    />
  );
};

const RowContents = ({ item, onPress }) => (
  <RectButton style={styles.rowItem} onPress={() => onPress()}>
    <Text style={styles.nameText}>{item.name}</Text>
    <Text numberOfLines={1} style={styles.descriptionText}>
      {item.description || 'No description'}
    </Text>
    <Text style={styles.quantityText}>{item.caption || ''}</Text>
  </RectButton>
);

const Row = ({ item, onPress, listState, listStates }) => {
  return (
    <SwipeableRow listState={listState} listStates={listStates}>
      <RowContents item={item} onPress={onPress} />
    </SwipeableRow>
  );
};

const Tab = ({
  tab,
  page,
  isTabActive,
  onPressHandler,
  onTabLayout,
  styles,
}) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 8,
    paddingVertical: 16,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.backgroundColor,
    fontWeight: '600',
  };
  return (
    <TouchableOpacity
      style={style}
      onPress={onPressHandler}
      onLayout={onTabLayout}
      key={page}
    >
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

interface ListsScreenProps {
  allLists: Array<{
    id: string;
    name: string;
    displayRank: number;
  }>;
  allListStates: Array<{
    id: string;
    name: string;
    displayRank: number;
    listID: string;
  }>;
  allItems: Array<{
    id: string;
    name: string;
    displayRank: number;
    listID: string;
    listStateID: string;
  }>;
  navigation: NavigationScreenProp<any, any>;
}

class ListsScreen extends Component<ListsScreenProps> {
  _scrollX = new Animated.Value(0);
  // 6 is a quantity of tabs
  interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
    scale: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: 'clamp',
    }),
    opacity: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['#000', '#fff', '#000'],
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['rgba(0,0,0,0.1)', COLORS.active, 'rgba(0,0,0,0.1)'],
      extrapolate: 'clamp',
    }),
  }));

  render() {
    const { allListStates, allItems, navigation } = this.props;
    const currentListID = '1';
    const listStates = allListStates
      .filter(listState => listState.listID === currentListID)
      .sort(sortListStatesByDisplayRank);

    return (
      <View style={[styles.container]}>
        <ScrollableTabView
          locked={true}
          renderTabBar={() => (
            <TabBar
              underlineColor={COLORS.active}
              tabBarStyle={{
                backgroundColor: '#fff',
                borderTopColor: '#d2d2d2',
                borderTopWidth: 1,
                marginTop: 0,
              }}
              renderTab={(
                tab,
                page,
                isTabActive,
                onPressHandler,
                onTabLayout,
              ) => (
                <Tab
                  key={page}
                  tab={tab}
                  page={page}
                  isTabActive={isTabActive}
                  onPressHandler={onPressHandler}
                  onTabLayout={onTabLayout}
                  styles={this.interpolators[page]}
                />
              )}
            />
          )}
          onScroll={x => this._scrollX.setValue(x)}
        >
          {listStates.map(listState => {
            return (
              <Page
                key={listState.id}
                tabLabel={{ label: listState.name }}
                listState={listState}
                listStates={listStates}
                items={allItems.filter(
                  item => item.listStateID === listState.id,
                )}
                navigation={navigation}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const COLORS = {
  active: '#ef5350',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  view: {
    marginTop: 0,
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
  const allLists = [];
  const allListStates = [];
  const allItems = [];

  for (const key in state.lists) {
    allLists.push(state.lists[key]);
  }

  for (const key in state.listStates) {
    allListStates.push(state.listStates[key]);
  }

  for (const key in state.items) {
    allItems.push(state.items[key]);
  }

  return {
    allLists,
    allListStates,
    allItems,
  };
};

export default connect(mapStateToProps)(ListsScreen);
