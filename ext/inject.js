const EXPECTED_SOURCE = 'cek-react-redux-bridge'
const GET_STATE = 'GET_STATE'
const DISPATCH = 'DISPATCH'

const code = document.createTextNode(`
  (global => {
    let store
    const extensionId = '${chrome.runtime.id}';
    const sendState = () => {
      window.postMessage({ source: '${EXPECTED_SOURCE}', state: JSON.stringify(store.getState()) }, '*')
    }

    window.addEventListener("message", event => {
      const { id, actionType, action } = event.data
      if(!store || id !== extensionId) return
      switch(actionType) {
        case '${DISPATCH}':
          return store.dispatch(action)
        case '${GET_STATE}':
          return sendState()
      }
    })

    const checkForState = (attempts=0) => {
      setTimeout(() => {
        if(typeof global.$r !== 'object') return checkForState(attempts + 1)

        try {
          store = global.$r.state.store
          store.subscribe(sendState)
          console.log('CEK initialised')
          sendState()
        } catch (err) {
          console.error('CEK ERROR: ', err)
        }
      })
    }

    checkForState()
  })(window)
`)

const script = document.createElement('script')
const exec = node => {
  document.documentElement.insertBefore(node, null)
  node.parentNode.removeChild(node)
}
script.type = 'text/javascript'
script.appendChild(code)
exec(script)

let pageState = null

window.addEventListener('message', ({ data: { source, state } }) => {
  if (source !== EXPECTED_SOURCE) return
  pageState = state
  chrome.runtime.sendMessage(pageState)
})

chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message.actionType) {
    case GET_STATE:
      if (!pageState) return
      return chrome.runtime.sendMessage(pageState)
    case DISPATCH:
      return window.postMessage(
        {
          ...message,
          id: chrome.runtime.id,
        },
        '*'
      )
  }
})
