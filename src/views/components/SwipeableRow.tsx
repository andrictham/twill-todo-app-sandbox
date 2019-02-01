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
    const { listState, listStates, handleItemTransition, item } = this.props;

    // listState displayRank counts from 1 not 0
    // so a listState's index = listState.displayRank - 1
    const nextListState =
      listState.displayRank === listStates.length
        ? listStates[0]
        : listStates[listState.displayRank];

    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          handleItemTransition(item.id, nextListState.id);
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
          {nextListState.name}
        </Animated.Text>
      </RectButton>
    );
  }
  renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  }
  renderRightActions = progress => (
    <View style={{ width: 192, flexDirection: 'row' }}>
      {this.renderRightAction('Move', '#ffab00', 128, progress)}
      {this.renderRightAction('Archive', '#dd2c00', 64, progress)}
    </View>
  )
  updateRef = ref => {
    this._swipeableRow = ref;
  }
  close = () => {
    this._swipeableRow.close();
  }
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={90}
        rightThreshold={40}
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
