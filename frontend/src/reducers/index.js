import { combineReducers } from 'redux'
import settings from 'reducers/settings'
import errors from 'reducers/errors'
import modals from 'reducers/modals'
import exchangeLog from 'reducers/exchangeLog'
import refs from 'reducers/refs'
import current from 'reducers/current'
import formEx from 'reducers/formEx'

import {reducer as form} from 'redux-form'

export default combineReducers({
    current,
    refs,
    settings,
    errors,
    modals,
    form,
    formEx,
    exchangeLog
});