import React from 'react'
import { render } from 'react-dom'
import Extension from './Extension'

const EXPECTED_SOURCE = 'cek-react-redux-bridge'

document.addEventListener('DOMContentLoaded', () => {
  render(<Extension />, document.getElementById('app'))
})
