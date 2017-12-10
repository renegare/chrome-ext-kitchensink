import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './createStore'
import Page from './Page'

export default class App extends Component {
  componentWillMount() {
    const store = createStore(this.props.initialData)
    this.setState({ store })
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Page />
      </Provider>
    )
  }
}
