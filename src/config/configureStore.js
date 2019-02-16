import Reactotron from "./ReactotronConfig";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import rootReducer from "../reducers";

const persistConfig = {
	key: "@twill/root",
	storage: AsyncStorage,
	whitelist: ["notifications"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	let store = Reactotron.createStore(
		persistedReducer,
		// composeWithDevTools(applyMiddleware()),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	);
	let persistor = persistStore(store);
	return { store, persistor };
};
