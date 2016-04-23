import { combineReducers } from 'redux'
import settings from 'reducers/settings'
import phases from 'reducers/phases'
import errors from 'reducers/errors'
import servers from 'reducers/servers'
import modals from 'reducers/modals' 
import exchangeLog from 'reducers/exchangeLog'

import {reducer as form} from 'redux-form'

export default combineReducers({
    settings,
    phases,
    errors,
    servers,
    modals,
    form,
    exchangeLog
});