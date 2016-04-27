import { combineReducers }  from 'redux'
import {reducer as form}    from 'redux-form'

import settings             from './settings'
import errors               from './errors'
import modals               from './modals'
import exchangeLog          from './exchangeLog'
import refs                 from './refs'
import current              from './current'

export default combineReducers({
    current,
    refs,
    settings,
    errors,
    modals,
    form,
    exchangeLog
});