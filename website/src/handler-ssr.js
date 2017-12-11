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
    <script type="text/javascript">
      window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
    </script>
    <script type="text/javascript" src="/server/client.bundle.js"></script>
  </body>
</html>`)
}
