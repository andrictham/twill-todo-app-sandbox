import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native';
import AuthService from '../../services/Auth';

interface State {
  user: firebase.User | null;
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
          <Button onPress={showLogoutAlert} title='Logout' color='crimson' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Login to save your lists and share it with friends</Text>
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

export default SettingsScreen;
