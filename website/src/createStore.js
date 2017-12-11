import { combineReducers, createStore } from 'redux'
import { SET_ITEM_STATE } from './constants'

const itemsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ITEM_STATE:
      const { enabled, id } = action.payload
      return state.map(item => {
        if (item.id === id) {
          return {
            ...item,
            enabled,
          }
        }

        return item
      })
  }

  return state
}

const reducer = combineReducers({
  items: itemsReducer,
})

const devTools =
  (typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  undefined

export default (initialState = {}) => {
  const store = createStore(reducer, initialState, devTools)
  return store
}
