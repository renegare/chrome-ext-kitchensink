import { SET_ITEM_STATE } from './constants'

export const toggleItem = (id, enabled) => ({
  type: SET_ITEM_STATE,
  payload: { id, enabled: !enabled },
})
