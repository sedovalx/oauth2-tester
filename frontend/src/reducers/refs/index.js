import { combineReducers }  from 'redux'

import httpMethods          from './httpMethods'
import flows                from './flows'
import servers              from './servers'

export default combineReducers({
    httpMethods,
    flows,
    servers
})
