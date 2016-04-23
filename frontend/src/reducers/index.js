import { combineReducers } from 'redux'
import settings from 'reducers/settings'
import errors from 'reducers/errors'
import servers from 'reducers/servers'
import modals from 'reducers/modals' 
import exchangeLog from 'reducers/exchangeLog'
import refs from 'reducers/refs'

import {reducer as form} from 'redux-form'

export default combineReducers({
    refs,
    settings,
    errors,
    servers,
    modals,
    form,
    exchangeLog
});