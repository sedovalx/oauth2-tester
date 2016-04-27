import { createAction } from 'redux-actions'
import actionTypes      from '/actions/actionTypes'

export const serverModalShow = createAction(actionTypes.SERVER_MODAL_SHOW);
export const serverModalClose = createAction(actionTypes.SERVER_MODAL_CLOSE);
