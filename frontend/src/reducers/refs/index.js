import { combineReducers } from 'redux'
import httpMethods from './httpMethods'
import flows from './flows'
import sections from './sections'
import servers from './servers'

export default combineReducers({
    httpMethods,
    flows,
    sections,
    servers
})
