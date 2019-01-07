import { Facebook } from 'expo';

import { config } from '../config';
import { Firebase } from '../integrations/firebase';

export default class AuthService {
  /**
   * Login with Facebook and Firebase
   *
   * Uses Expo Facebook API and authenticates the Facebook user in Firebase
   */
  public static async loginWithFacebook() {
    const appID = config.facebook.appId;
    const permissions = ['public_profile', 'email'];

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      appID,
      { permissions },
    );

    switch (type) {
      case 'success': {
        if (token) {
          // Set persistent auth state
          await Firebase.auth().setPersistence(
            Firebase.auth.Auth.Persistence.LOCAL,
          );

          // Build Firebase credential with the Facebook access token.
          const credential = Firebase.auth.FacebookAuthProvider.credential(
            token,
          );

          // Sign in with Facebook user credentials
          const facebookProfileData = await Firebase.auth().signInAndRetrieveDataWithCredential(
            credential,
          );

          // Do something with Facebook profile data
          // OR you have subscribed to auth state change, authStateChange handler will process the profile data

          return Promise.resolve({ type: 'success' });
        }
      }
      case 'cancel': {
        return Promise.resolve({ type: 'cancel' });
      }
    }
  }

  /**
   * Register a subscription callback for changes of the currently authenticated user
   *
   * @param callback Called with the current authenticated user as first argument
   */
  public static subscribeAuthChange(
    callback: (user: firebase.User | null) => void,
  ) {
    Firebase.auth().onAuthStateChanged(callback);
  }

  public static async logout() {
    return Firebase.auth().signOut();
  }
}
