export const ADD_LIST = 'ADD_LIST';
export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_COLUMN_ITEM = 'ADD_COLUMN_ITEM';
export const REMOVE_COLUMN_ITEM = 'REMOVE_COLUMN_ITEM';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM_COLUMN = 'UPDATE_ITEM_COLUMN';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const NOTIFICATIONS_ARE_SET = 'NOTIFICATIONS_ARE_SET';

// LISTS

export const addList = ({ id, name, icon }) => ({
  id,
  name,
  icon,
  type: ADD_LIST,
});

// COLUMNS

export const addColumn = ({ id, listID, name }) => ({
  id,
  listID,
  name,
  type: ADD_COLUMN,
});

export const addColumnItem = ({ id, itemID }) => ({
  id,
  itemID,
  type: ADD_COLUMN_ITEM,
});

export const removeColumnItem = ({ id, itemID }) => ({
  id,
  itemID,
  type: REMOVE_COLUMN_ITEM,
});

// ITEMS

export const addItem = ({ id, listID, columnID, name }) => ({
  id,
  listID,
  columnID,
  name,
  type: ADD_ITEM,
});

export const updateItemColumn = ({ id, newColumnID }) => {
  console.tron.log('updateItemColumn id ', id);
  console.tron.log('updateItemColumn to newColumnID ', newColumnID);
  return {
    id,
    newColumnID,
    type: UPDATE_ITEM_COLUMN,
  };
};

export const updateItem = ({ id, name, description }) => ({
  id,
  name,
  description,
  type: UPDATE_ITEM,
});

// NOTIFICATIONS

export const notificationsAreSet = () => ({
  type: NOTIFICATIONS_ARE_SET,
});
