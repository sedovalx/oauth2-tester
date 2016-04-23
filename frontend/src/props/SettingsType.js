import React from 'react'

const SettingsType = {
    title: React.PropTypes.string.isRequired,
    callbackUri: React.PropTypes.string.isRequired,
    credentials: React.PropTypes.shape({
        username: React.PropTypes.string,
        password: React.PropTypes.string
    }).isRequired
};

export default SettingsType;   
