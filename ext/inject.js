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

    const checkForState = (attempts=1) => {
      if(attempts > 10) throw new Error('3 attenpts exceeded')
      setTimeout(() => {
        try {
          if(typeof global.$r !== 'object') return checkForState(attempts + 1)

          store = global.$r.state.store
          store.subscribe(sendState)
          console.log('CEK initialised')
          sendState()
        } catch (err) {
          console.error('CEK ERROR: ', err)
        }
      }, 300)
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

window.addEventListener('message', ({ data: { source, state } }) => {
  if (source !== EXPECTED_SOURCE) return
  chrome.runtime.sendMessage(state)
})

chrome.runtime.onMessage.addListener((message, sender) => {
  return window.postMessage(
    {
      ...message,
      id: chrome.runtime.id,
    },
    '*'
  )
})
