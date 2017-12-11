import { combineReducers, createStore } from 'redux'

const itemsReducer = (state = [], action) => {
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
