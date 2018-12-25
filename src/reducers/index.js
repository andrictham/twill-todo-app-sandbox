import { combineReducers } from 'redux';
import * as types from '../actions/index';
// import { reducer as formReducer } from 'redux-form'
// import initialLists from '../utils/data'

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

// const lists = (state = [], action) => {
//   switch (action.type) {
//     case types.ADD_LIST:
//       const { id, name } = action
//       return {
//         [id]: {
//           id,
//           name,
//         },
//         ...state,
//       }
//     default:
//       return state
//   }
// }

// const listStates = (state = [], action) => {
//   switch (action.type) {
//     case types.ADD_LIST_STATE:
//       const { listStateID, listID, index, name } = action
//       return {
//         [listStateID]: {
//           listId,
//           index,
//           name,
//         },
//         ...state,
//       }
//     default:
//       return state
//   }
// }

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
  items,
  // lists,
  // listStates,
  notifications,
  // form: formReducer,
});

export default rootReducer;
