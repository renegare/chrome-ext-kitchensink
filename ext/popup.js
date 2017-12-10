import React from 'react'
import { render } from 'react-dom'
import Extension from './Extension'

document.addEventListener('DOMContentLoaded', () => {
  render(<Extension />, document.getElementById('app'))
})
