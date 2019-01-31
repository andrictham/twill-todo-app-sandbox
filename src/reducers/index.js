import { combineReducers } from "redux";
import * as types from "../actions/index";
// import { reducer as formReducer } from 'redux-form'
import mockLists from "../utils/data/mockLists.ts";
import mockListStates from "../utils/data/mockListStates.ts";
import mockItems from "../utils/data/mockItems.ts";

const lists = (state = mockLists, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      const { id, name, displayRank, icon } = action;
      return {
        [id]: {
          id,
          name,
          icon,
          displayRank,
        },
        ...state,
      };
    default:
      return state;
  }
};

const listStates = (state = mockListStates, action) => {
  switch (action.type) {
    case types.ADD_LIST_STATE:
      const { id, listID, name, displayRank } = action;
      return {
        [id]: {
          listID,
          name,
          displayRank,
        },
        ...state,
      };
    default:
      return state;
  }
};

const items = (state = mockItems, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      const {
        id,
        listID,
        listStateID,
        displayRank,
        name,
        description,
      } = action;
      return {
        [id]: {
          listID,
          listStateID,
          displayRank,
          name,
          description,
        },
        ...state,
      };
    default:
      return state;
  }
};

const notifications = (
  state = {
    areNotificationsSet: false,
  },
  action,
) => {
  switch (action.type) {
    case types.NOTIFICATIONS_ARE_SET:
      return {
        areNotificationsSet: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  notifications,
  lists,
  listStates,
  items,
  // form: formReducer,
});

export default rootReducer;
