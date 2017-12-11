import React from 'react'
import { connect } from 'react-redux'

const Loading = () => <p>Loading ...</p>

const ListOfItems = props => {
  const { state: { items } } = props

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            {item.title}
            <button style={{ background: item.enabled ? 'green' : 'red' }}>
              {item.enabled ? 'en' : 'dis'}abled
            </button>
          </label>
        </li>
      ))}
    </ul>
  )
}

const mapToState = state => ({
  connected: state.connected,
  state: state.page,
})

export default connect(mapToState)(
  ({ connected, state }) =>
    connected ? <ListOfItems state={state} /> : <Loading />
)
