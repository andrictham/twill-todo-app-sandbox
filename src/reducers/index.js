import { combineReducers } from 'redux';
import * as types from '../actions/index';
// import { reducer as formReducer } from 'redux-form'
import mockLists from '../utils/data/mockLists.ts';
import mockColumns from '../utils/data/mockColumns.ts';
import mockItems from '../utils/data/mockItems.ts';

const lists = (state = mockLists, action) => {
  switch (action.type) {
    // case types.ADD_LIST:
    //   const { id, name, icon } = action;
    //   return {
    //     [id]: {
    //       id,
    //       name,
    //       icon,    //     },
    //     ...state,
    //   };
    default:
      return state;
  }
};

const columns = (state = mockColumns, action) => {
  switch (action.type) {
    case types.ADD_COLUMN_ITEM: {
      let { id, itemID } = action;
      return {
        [id]: {
          items: [...state[id].items, itemID],
        },
        ...state,
      };
    }
    case types.REMOVE_COLUMN_ITEM: {
      let { id, itemID } = action;
      return {
        [id]: {
          items: state[id].items.filter(item => item.id !== itemID),
        },
        ...state,
      };
    }
    default:
      return state;
  }
};

const items = (state = mockItems, action) => {
  switch (action.type) {
    case types.UPDATE_ITEM_COLUMN:
      console.tron.log('item reducer called UPDATE_ITEM_COLUMN');
      return {
        ...state,
        [action.id]: {
          listID: state[action.id].listID,
          columnID: action.newColumnID,
          name: state[action.id].name,
          description: state[action.id].description,
        },
      };
    // case types.ADD_ITEM:
    //   let { id, listID, columnID, name, description } = action;
    //   return {
    //     [id]: {
    //       listID,
    //       columnID,
    //       name,
    //       description,
    //     },
    //     ...state,
    //   };
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
  columns,
  items,
  // form: formReducer,
});

export default rootReducer;
