import actionTypes from 'actions/actionTypes'
import { fetchSettings } from 'rest/index'

export default () => ({
    types: [actionTypes.FETCH_SETTINGS_START, actionTypes.FETCH_SETTINGS_END],
    callAPI: fetchSettings
})
