import React from 'react'
import FlowType from 'props/FlowType'

const SettingsType = {
    title: React.PropTypes.string.isRequired,
    callbackUri: React.PropTypes.string.isRequired,
    flows: React.PropTypes.shape({
        items: React.PropTypes.arrayOf(React.PropTypes.shape(FlowType)).isRequired,
        current: React.PropTypes.shape(FlowType)
    }).isRequired,
    credentials: React.PropTypes.shape({
        username: React.PropTypes.string,
        password: React.PropTypes.string
    }).isRequired
};

export default SettingsType; 
