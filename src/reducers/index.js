import { combineReducers } from 'redux'
import * as types from '../actions/index'
import { reducer as formReducer } from 'redux-form'
// import initialLists from '../utils/data'

const items = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      const {
        id,
        listID,
        listState,
        index,
        name,
        quantity,
        collectiveNoun,
      } = action
      return {
        [id]: {
          listID,
          listState,
          index,
          name,
          quantity,
          collectiveNoun,
        },
        ...state,
      }
  }

const lists = (state = [], action) => {
  switch (action.type) {
    case types.ADD_LIST:
      const { id, name } = action
      return {
        [id]: {
          id,
          name,
          listStates: [],
        },
        ...state,
      }
    case types.ADD_LIST_STATE:
      const { id, listID, index, name } = action
      return {
        ...state,
        [listID]: {
          ...state[listID],
          listStates: state[listID].listStates.splice(index, 0, {id, listID, index, name}),
        },
      }
    default:
      return state
  }
}

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
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  items,
  lists,
  notifications,
  form: formReducer,
})

export default rootReducer
