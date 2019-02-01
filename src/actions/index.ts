export const ADD_ITEM = 'ADD_ITEM';
export const TRANSITION_ITEM_LIST_STATE = 'TRANSITION_ITEM_LIST_STATE';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const ADD_LIST_STATE = 'ADD_LIST_STATE';
export const NOTIFICATIONS_ARE_SET = 'NOTIFICATIONS_ARE_SET';

export const addList = ({ id, name, displayRank, icon }) => ({
  id,
  name,
  displayRank,
  icon,
  type: ADD_LIST,
});

export const addListState = ({ id, listID, name, displayRank }) => ({
  id,
  listID,
  displayRank,
  name,
  type: ADD_LIST_STATE,
});

export const addItem = ({ id, listID, listStateID, displayRank, name }) => ({
  id,
  listID,
  listStateID,
  displayRank,
  name,
  type: ADD_ITEM,
});

export const transitionItemListState = ({ id, listStateID }) => {
  console.tron.log('transitionItemListState id ', id);
  console.tron.log('transitionItemListState to listStateID ', listStateID);
  return {
    id,
    listStateID,
    type: TRANSITION_ITEM_LIST_STATE,
  };
};

export const updateItem = ({ id, name, description }) => ({
  id,
  name,
  description,
  type: UPDATE_ITEM,
});

export const notificationsAreSet = () => ({
  type: NOTIFICATIONS_ARE_SET,
});
