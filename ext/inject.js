const EXPECTED_SOURCE = 'cek-react-redux-bridge';
const GET_STATE = 'GET_STATE';
const DISPATCH = 'DISPATCH';

const code = document.createTextNode(`
  (global => {
    global.__CKE_REGISTER_REDUX__ = store => {

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

      store.subscribe(sendState)
      sendState()
    }

  })(window)
`);

const script = document.createElement('script');
const exec = node => {
  document.documentElement.insertBefore(node, null);
  node.parentNode.removeChild(node);
};
script.type = 'text/javascript';
script.appendChild(code);
exec(script);

window.addEventListener('message', ({ data: { source, state } }) => {
  if (source !== EXPECTED_SOURCE) return;
  chrome.runtime.sendMessage(state);
});

chrome.runtime.onMessage.addListener((message, sender) => {
  return window.postMessage(
    {
      ...message,
      id: chrome.runtime.id,
    },
    '*'
  );
});
