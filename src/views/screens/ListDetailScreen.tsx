import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default class ListDetailScreen extends Component {
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
