import { combineReducers, createStore } from 'redux'

const itemsReducer = (state = [], action) => {
  return state
}

const reducer = combineReducers({
  items: itemsReducer,
})

export default (initialState = {}) => {
  const store = createStore(reducer, initialState)
  return store
}
