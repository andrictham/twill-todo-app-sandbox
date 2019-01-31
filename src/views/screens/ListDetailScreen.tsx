import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface ListDetailScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default class ListDetailScreen extends Component<ListDetailScreenProps> {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('name', 'No name');
    return {
      title: name,
    };
  };
  render() {
    const { navigation } = this.props;
    const description = navigation.getParam('description', 'No description');
    return (
      <View style={styles.view}>
        <Text>{description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 0,
  },
});
