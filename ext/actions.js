import { SET_ITEM_STATE, DISPATCH } from './constants'

export const toggleItem = (id, enabled) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      actionType: DISPATCH,
      action: {
        type: SET_ITEM_STATE,
        payload: { id, enabled: !enabled },
      },
    })
  })
}
