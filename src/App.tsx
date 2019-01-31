import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeConfig from './config/configureStore';
const {
  createBottomTabNavigator,
  createAppContainer,
} = require('react-navigation');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import HomeScreen from './views/screens/HomeScreen.tsx'
import HomeScreen from './views/screens/HomeScreen';
import ListsScreen from './views/screens/ListsScreen';
import SettingsScreen from './views/screens/SettingsScreen';
import ListDetailScreen from './views/screens/ListDetailScreen';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const ListsStack = createStackNavigator(
  {
    Lists: ListsScreen,
    ListDetail: ListDetailScreen,
  },
  {
    headerMode: 'screen',
    headerBackTitleVisible: false,
  },
);

interface ITabBarIcon {
  focused: boolean;
  horizontal: boolean;
  tintColor: string | undefined;
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Lists: ListsStack,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: ITabBarIcon) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Lists') {
          iconName = 'format-list-checks';
        } else if (routeName === 'Settings') {
          iconName = `settings${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <MaterialCommunityIcons
            name={iconName ? iconName : 'border-none-variant'}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(TabNavigator);

const store = storeConfig().store;

const App = () => {
  Reactotron.clear();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={storeConfig().persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
