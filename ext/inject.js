const EXPECTED_SOURCE = 'cek-react-redux-bridge'
const GET_STATE = 'GET_STATE'

const code = document.createTextNode(`
  (global => {
    const sendMessage = (data) => {
      window.postMessage({ source: '${EXPECTED_SOURCE}', state: JSON.stringify(data) }, '*')
    }

    const checkForState = (attempts=0) => {
      setTimeout(() => {
        if(typeof global.$r !== 'object') return checkForState(attempts + 1)

        try {
          const { state: { store } } = global.$r
          store.subscribe(() => {
            return sendMessage(store.getState())
          })
          console.log('CEK initialised')
          sendMessage(store.getState())
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
  console.log('sending message', { state })
  pageState = state
  chrome.runtime.sendMessage(pageState)
})

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log()
  if (message !== GET_STATE || !pageState) return
  chrome.runtime.sendMessage(pageState)
})
