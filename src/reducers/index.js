import { combineReducers } from 'redux';
import * as types from '../actions/index';
// import { reducer as formReducer } from 'redux-form'
// import initialLists from '../utils/data'

const lists = (state = [], action) => {
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

const listStates = (state = {}, action) => {
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

const items = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      const {
        id,
        listID,
        listStateID,
        index,
        name,
        quantity,
        collectiveNoun,
      } = action;
      return {
        [id]: {
          listID,
          listStateID,
          index,
          name,
          quantity,
          collectiveNoun,
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
  items,
  lists,
  listStates,
  // form: formReducer,
});

export default rootReducer;
