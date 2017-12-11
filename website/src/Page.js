import React, { Component } from 'react'
import { connect } from 'react-redux'
import types from 'prop-types'

const mapStateToProps = state => {
  return {
    hasItems: state.items.length > 0,
    items: state.items,
  }
}

@connect(mapStateToProps)
export default class Page extends Component {
  static propTypes: {
    hasItems: types.bool.isRequired,
    items: types.array.isRequired,
  }

  renderItems() {
    const { items } = this.props
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Toggle {...item} />
          </li>
        ))}
      </ul>
    )
  }

  renderNoItems() {
    return <p>No Items to list</p>
  }

  render() {
    const { hasItems } = this.props

    return hasItems ? this.renderItems() : this.renderNoItems()
  }
}

const Toggle = ({ title, enabled, onToggle }) => (
  <label>
    {title}
    <button onClick={() => onToggle()}>{enabled ? 'en' : 'dis'}abled</button>
  </label>
)
