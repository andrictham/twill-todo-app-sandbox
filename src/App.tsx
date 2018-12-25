import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeConfig from './config/configureStore';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
const {
  createBottomTabNavigator,
  createAppContainer,
} = require('react-navigation');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthService from './services/Auth';
import ListsScreen from './views/screens/ListsScreen';
import { create } from 'uuid-js';

interface State {
  user: firebase.User | null;
}

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends Component<{}, State> {
  public state: State = { user: null };

  public componentDidMount() {
    AuthService.subscribeAuthChange(user => this.setState({ user }));
  }

  public render() {
    const { user } = this.state;

    const getHigherResProviderPhotoUrl = ({
      photoURL,
      providerData,
    }: any): string => {
      // Workaround to get higer-res profile picture
      let result = photoURL;
      if (providerData[0].providerId.includes('google')) {
        result = photoURL.replace('s96-c', 's400-c');
      } else if (providerData[0].providerId.includes('facebook')) {
        result = `${photoURL}?type=large`;
      } else {
        result = null;
      }
      return result;
    };

    if (user) {
      const avatar = user.photoURL && (
        <Image
          style={{ width: 100, height: 100, margin: 20 }}
          source={{ uri: getHigherResProviderPhotoUrl(user) }}
        />
      );

      // Find out what user signed in with
      const userSignedInWith = () => {
        const userProviderData = user ? user.providerData[0] : null;
        if (userProviderData !== null) {
          switch (userProviderData.providerId) {
            case 'facebook.com': {
              return 'Facebook';
            }
            default: {
              break;
            }
          }
        }
      };

      const showLogoutAlert = () => {
        Alert.alert(
          'Are you sure?',
          '',
          [
            {
              text: 'Logout',
              onPress: () => AuthService.logout(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      };

      return (
        <View style={styles.container}>
          <Text>Welcome, {user.displayName}!</Text>
          {avatar}
          <Text>{`Logged in with ${userSignedInWith()}`}</Text>
          <Button onPress={showLogoutAlert} title="Logout" color="crimson" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Login to save your lists and share it with friends</Text>
        <Button
          onPress={AuthService.loginWithFacebook}
          title="Login with Facebook"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ITabBarIcon {
  focused: boolean;
  horizontal: boolean;
  tintColor: string | undefined;
}

const TabNavigator = createBottomTabNavigator(
  {
    // Home: HomeScreen,
    Lists: ListsScreen,
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

const App = () => (
  <Provider store={storeConfig().store}>
    <PersistGate loading={null} persistor={storeConfig().persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default App;
