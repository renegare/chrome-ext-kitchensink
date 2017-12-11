import React, { Component } from 'react'
import { connect } from 'react-redux'
import types from 'prop-types'
import { toggleItem } from './actions'

const mapStateToProps = state => {
  return {
    hasItems: state.items.length > 0,
    items: state.items,
  }
}

@connect(mapStateToProps, { toggleItem })
export default class Page extends Component {
  static propTypes: {
    hasItems: types.bool.isRequired,
    items: types.array.isRequired,
    toggleItem: types.func.isRequred,
  }

  renderItems() {
    const { items, toggleItem } = this.props
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Toggle
              {...item}
              onToggle={() => toggleItem(item.id, item.enabled)}
            />
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
    <button
      style={{ background: enabled ? 'green' : 'red' }}
      onClick={e => onToggle(e, this)}
    >
      {enabled ? 'en' : 'dis'}abled
    </button>
  </label>
)
