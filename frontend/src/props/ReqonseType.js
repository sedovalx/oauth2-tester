import React from 'react'
import KeyValueType from './KeyValueType'

// Reqonse = Request/Response
export default {
    method: React.PropTypes.oneOf(['GET', 'PUT', 'POST', 'DELETE']).isRequired,
    uri: React.PropTypes.string.isRequired,
    body: React.PropTypes.string,
    headers: React.PropTypes.arrayOf(KeyValueType)
}
