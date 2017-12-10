import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export default (req, res) => {
  const initialData = {
    items: Array(10)
      .fill('')
      .map((_, i) => ({
        id: `id-${i + 1}`,
        title: `Permission ${i + 1}`,
        enabled: Math.random() < 0.5,
      })),
  }

  res.send(`<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="app">${renderToString(<App initialData={initialData} />)}</div>
  </body>
</html>`)
}
