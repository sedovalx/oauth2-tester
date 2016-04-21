import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'

export const settingsModalShow = createAction(actionTypes.SETTINGS_MODAL_SHOW);
export const settingsModalClose = createAction(actionTypes.SETTINGS_MODAL_CLOSE);