export const ADD_ITEM = 'ADD_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const ADD_LIST_STATE = 'ADD_LIST_STATE';
export const NOTIFICATIONS_ARE_SET = 'NOTIFICATIONS_ARE_SET';

export const addList = (id, name, displayRank, icon) => ({
  type: ADD_LIST,
  id,
  name,
  displayRank,
  icon,
});

export const addListState = (id, listID, name, displayRank) => ({
  type: ADD_LIST_STATE,
  id,
  listID,
  displayRank,
  name,
});

export const addItem = (
  id,
  listID,
  listStateID,
  displayRank,
  name,
  quantity,
  collectiveNoun,
) => ({
  type: ADD_ITEM,
  id,
  listID,
  listStateID,
  displayRank,
  name,
  quantity,
  collectiveNoun,
});

export const notificationsAreSet = () => ({
  type: NOTIFICATIONS_ARE_SET,
});
