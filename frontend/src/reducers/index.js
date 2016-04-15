import { combineReducers } from 'redux'
import commons from 'reducers/commons';
import phases from 'reducers/phases';
import availablePhases from 'reducers/availablePhases';
import errors from 'reducers/errors';
import servers from 'reducers/servers';
import modals from 'reducers/modals';
import editors from 'reducers/editors'

export default combineReducers({
    commons,
    phases,
    availablePhases,
    errors,
    servers,
    modals,
    editors
});