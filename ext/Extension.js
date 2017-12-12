import React, { Component } from 'react'
import createStore from './createStore'
import Widget from './Widget'
import { Provider } from 'react-redux'
import { CONNECTED, SET_PAGE_STATE, GET_STATE } from './constants'

export default class Extenstion extends Component {
  componentWillMount() {
    const store = createStore(this.props.initialData)

    chrome.runtime.onMessage.addListener((message, sender) => {
      if (!sender.tab.active) return

      const state = JSON.parse(message)

      store.dispatch({
        type: SET_PAGE_STATE,
        payload: { page: state },
      })

      store.dispatch({
        type: CONNECTED,
      })
    })

    this.setState({ store })

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { actionType: GET_STATE })
    })
  }

  // @TODO on componentDidMount send message to current tab to resend data
  render() {
    return (
      <Provider store={this.state.store}>
        <Widget />
      </Provider>
    )
  }
}
