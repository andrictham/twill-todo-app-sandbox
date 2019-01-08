import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  // port: 9090,
  host: '192.168.1.123',
}) // controls connection & communication settings
  .use(reactotronRedux()) // integrate with Redux
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = Reactotron;

export default reactotron;
