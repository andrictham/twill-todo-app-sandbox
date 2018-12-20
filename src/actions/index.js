export const ADD_ITEM = 'ADD_ITEM'
export const ADD_LIST = 'ADD_LIST'
export const ADD_LIST_STATE = 'ADD_LIST_STATE'
export const NOTIFICATIONS_ARE_SET = 'NOTIFICATIONS_ARE_SET'

export const addList = (id, name) => ({
  type: ADD_LIST,
  id,
  name,
})

export const addItem = (
  id,
  listID,
  listState,
  index,
  name,
  quantity,
  collectiveNoun,
) => ({
  type: ADD_ITEM,
  id,
  listID,
  listState,
  index,
  name,
  quantity,
  collectiveNoun,
})

export const addListState = (id, listID, name, index) => ({
  type: ADD_LIST_STATE,
  id,
  listID,
  index,
  name,
})

export const notificationsAreSet = () => ({
  type: NOTIFICATIONS_ARE_SET,
})
