import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { SET_ITEM_STATE } from './constants';

const itemsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ITEM_STATE:
      const { enabled, id } = action.payload;
      return state.map(item => {
        if (item.id === id) {
          return {
            ...item,
            enabled,
          };
        }

        return item;
      });
  }

  return state;
};

const reducer = combineReducers({
  items: itemsReducer,
});

const createChromeExtBridge = store => {
  typeof window === 'object' &&
    window.__CKE_REGISTER_REDUX__ &&
    window.__CKE_REGISTER_REDUX__(store);
};

export default (initialState = {}) => {
  const store = createStore(reducer, initialState);

  // @TODO: make this configurable so we control when it should be called.
  createChromeExtBridge(store);

  return store;
};
