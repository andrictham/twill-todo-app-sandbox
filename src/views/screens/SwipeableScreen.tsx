import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import SwipeableRow from '../components/SwipeableRow';

const RowContents = ({ item }: any) => (
  <RectButton style={styles.rectButton} onPress={() => Alert.alert(item.title)}>
    <Text style={styles.titleText}>{item.title}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.message}
    </Text>
    <Text style={styles.dateText}>
      {item.when} {'❭'}
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

export default class Example extends Component {
  render() {
    return (
      <View style={styles.view}>
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>To Buy</Text>
            </View>}
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
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
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
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

const DATA = [
  {
    title: '🥜 Nutty Bruce Almond Milk',
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    title: '🥥 Nutty Bruce Coconut Milk',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    title: '🥣 CeresOrganics Paleo Mix',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    title: '🥛 Pacific Soy Milk',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    title: '🍃 Baby spinach',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    title: '🥑 Avocados',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    title: '🍌 Bananas',
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    title: '⚪️ Frozen Hokkaido Scallops',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];
