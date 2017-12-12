import React from 'react'
import { connect } from 'react-redux'
import { toggleItem } from './actions'

const Loading = ({ what }) => <p>Loading {what} ...</p>

const ListOfItems = props => {
  const { items } = props

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            {item.title}
            <button
              onClick={() => {
                toggleItem(item.id, item.enabled)
              }}
              style={{ background: item.enabled ? 'green' : 'red' }}
            >
              {item.enabled ? 'en' : 'dis'}abled
            </button>
          </label>
        </li>
      ))}
    </ul>
  )
}

const mapToState = state => state.page

export default connect(mapToState)(({ items }) => {
  return (
    <section>
      <h3> Items </h3>
      {items ? <ListOfItems items={items} /> : <Loading what="items" />}
    </section>
  )
})
