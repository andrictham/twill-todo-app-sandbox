import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import AuthService from './services/Auth';

interface State {
  user: firebase.User | null;
}

export default class App extends React.Component<{}, State> {
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

      const getSignInMethod = () => {
        if (user.providerData != null) {
          switch (user.providerData[0].providerId) {
            case 'facebook.com':
              return 'Facebook';
          }
        }
      };

      return (
        <View style={styles.container}>
          <Text>Welcome, {user.displayName}!</Text>
          {avatar}
          <Text>{`Logged in with ${getSignInMethod()}`}</Text>
          <Button onPress={AuthService.logout} title='Logout' color='crimson' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
        <Button
          onPress={AuthService.loginWithFacebook}
          title='Login with Facebook'
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
