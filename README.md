# Twill

A React Native app built with Expo and Typescript.

This project also comes set up with testing, linting, env configuration, type checking and CI support, based on [ch1ll0ut1’s boilerplate](https://github.com/ch1ll0ut1/react-native-expo-typescript-boilerplate).

## How to use

### Pre-requesites

- Node.js v10.x
- This project uses `npm` instead of `yarn`
- Expo CLI. If you didnt install it yet, run: `npm i -g expo-cli`
- Install dependencies: `npm ic`
- Run `cp .env.example .env` to create a .env file, and fill in the appropriate secrets from Firebase and Facebook

### To run the project

`npm start`

This will open a new window with expo web interface and allow you to scan the QR code with your iPhone camera or the expo Android app, which lets you open this react-native mobile app.

Now you can start editing files and the app will automatically refresh and show you your latest changes.

#### Reactotron

- Install Reactotron https://github.com/infinitered/reactotron/blob/master/docs/installing.md
- In this project, go to ReactotronConfig.js, add your local IP address (check System Preferences > Network) as host.

```
const reactotron = Reactotron.configure({
  port: 9090,
  host: "10.8.0.108", // local IP address here
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();
```

- Launch Reactotron and you should see some events in the Timeline

### Build

For build read more at the official expo documentation: https://docs.expo.io/versions/latest/distribution/building-standalone-apps

### Testing

`npm test`

### Linting

`npm lint`

### CI Validation

`npm validate`
