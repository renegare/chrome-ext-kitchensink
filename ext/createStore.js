import { combineReducers, createStore } from 'redux'
import { CONNECTED, SET_PAGE_STATE } from './constants'

const connectedReducer = (state = false, action) => {
  switch (action.type) {
    case CONNECTED:
      return true
  }

  return state
}

const pageReducer = (state = { wtf: true }, action) => {
  switch (action.type) {
    case SET_PAGE_STATE:
      return action.payload.page
  }

  return state
}

const reducer = combineReducers({
  connected: connectedReducer,
  page: pageReducer,
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
