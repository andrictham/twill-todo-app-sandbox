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

import SwipeableRow from '../components/SwipeableRow';
import { updateItemColumn } from '../../actions/index';
import { sortcolumnsByDisplayRank } from '../../utils/sorting';

const Row = ({ item, onPress, column, columns, handleItemTransition }) => {
  return (
    <SwipeableRow
      column={column}
      columns={columns}
      item={item}
      handleItemTransition={handleItemTransition}
    >
      <RowContents item={item} onPress={onPress} />
    </SwipeableRow>
  );
};

const RowContents = ({ item, onPress }) => (
  <RectButton style={styles.rowItem} onPress={() => onPress()}>
    <Text style={styles.nameText}>{item.name}</Text>
    <Text numberOfLines={1} style={styles.descriptionText}>
      {item.description || 'No description'}
    </Text>
  </RectButton>
);

interface PageProps {
  items: Array<{
    id: string;
    name: string;
    displayRank: number;
  }>;
  column: {
    id: string;
    listID: string;
    name: string;
    displayRank: number;
  };
  columns: Array<{
    id: string;
    listID: string;
    name: string;
    displayRank: number;
  }>;
  tabLabel: {
    label: string;
  };
  navigation: NavigationScreenProp<any, any>;
  handleItemTransition(id: string, listID: string): void;
}

const Page = (props: PageProps) => {
  const { column, columns, items, navigation, handleItemTransition } = props;

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
            column={column}
            columns={columns}
            handleItemTransition={handleItemTransition}
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
  allColumns: Array<{
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
    columnID: string;
  }>;
  navigation: NavigationScreenProp<any, any>;
  updateItemColumn(
    arg: object,
  ): {
    id: string;
    columnID: string;
    type: string; // action type
  };
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

  handleItemTransition = (id: string, columnID: string) => {
    this.props.updateItemColumn({ id, columnID });
  };

  render() {
    const { allLists, allColumns, allItems, navigation } = this.props;
    const currentListID = '1list';

    console.tron.log(allLists[currentListID]);

    const columns = allLists[currentListID].listColumns.map(
      columnID => allColumns[columnID],
    );

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
          {columns.map(column => {
            return (
              <Page
                key={column.id}
                tabLabel={{ label: column.name }}
                column={column}
                columns={columns}
                items={allItems.filter(item => item.columnID === column.id)}
                navigation={navigation}
                handleItemTransition={this.handleItemTransition}
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
  const allColumns = [];
  const allItems = [];

  // for (const key in state.lists) {
  //   allLists.push(state.lists[key]);
  // }

  // for (const key in state.columns) {
  //   allColumns.push(state.columns[key]);
  // }

  for (const key in state.items) {
    allItems.push(state.items[key]);
  }

  return {
    allLists: state.lists,
    allColumns: state.columns,
    allItems,
  };
};

export default connect(
  mapStateToProps,
  { updateItemColumn },
)(ListsScreen);
