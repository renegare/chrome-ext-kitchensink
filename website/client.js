import React from 'react'
import App from './src/App'
import { hydrate } from 'react-dom'

const initialData = window.__INITIAL_DATA__ || {}

hydrate(<App initialData={initialData} />, document.getElementById('app'))
