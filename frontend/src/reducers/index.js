import { combineReducers } from 'redux'
import commons from 'reducers/commons';
import phases from 'reducers/phases';
import availablePhases from 'reducers/availablePhases';
import errors from 'reducers/errors';
import servers from 'reducers/servers';

export default combineReducers({
    commons,
    phases,
    availablePhases,
    errors,
    servers
});