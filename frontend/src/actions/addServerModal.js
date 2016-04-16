import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'

export const addServerModalShow = createAction(actionTypes.ADD_SERVER_MODAL_SHOW);
export const addServerModalCancel = createAction(actionTypes.ADD_SERVER_MODAL_CANCEL);
export const addServerModalAccept = createAction(actionTypes.ADD_SERVER_MODAL_ACCEPT);
