import { combineReducers } from 'redux'
import settings from 'reducers/settings'
import phases from 'reducers/phases'
import availablePhases from 'reducers/availablePhases'
import errors from 'reducers/errors'
import servers from 'reducers/servers'
import modals from 'reducers/modals' 

import {reducer as form} from 'redux-form'

export default combineReducers({
    settings,
    phases,
    availablePhases,
    errors,
    servers,
    modals,
    form
});