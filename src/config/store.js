import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import rootReducer from '../reducers'

const persistConfig = {
  key: '@listify/root',
  storage: AsyncStorage,
  whitelist: ['lists', 'notifications'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
