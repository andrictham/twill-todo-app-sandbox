import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Alert } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Haptic } from 'expo';

export default class AppleStyleSwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    const { column, columns, handleItemTransition, item } = this.props;

    const columnIndex = columns.indexOf(column);
    const newColumn =
      columnIndex !== columns.length - 1 // if current column is not last
        ? columns[columnIndex + 1] // go to column to right
        : columns[0]; // else go to first column

    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          handleItemTransition(item.id, newColumn.id);
          this.close();
        }}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {newColumn.name}
        </Animated.Text>
      </RectButton>
    );
  };

  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    const { column, columns, handleItemTransition, item } = this.props;

    const columnIndex = columns.indexOf(column);

    const newColumn =
      columnIndex !== 0 // if current column is not first
        ? columns[columnIndex - 1] // go to column to left
        : columns[columns.length - 1]; // else go to last column

    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          handleItemTransition(item.id, newColumn.id);
          this.close();
        }}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {newColumn.name}
        </Animated.Text>
      </RectButton>
    );
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={90}
        rightThreshold={90}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
        onSwipeableLeftWillOpen={() => {
          Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
        }}
        onSwipeableLeftOpen={() => {
          this.close();
        }}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
});
