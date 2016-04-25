import React from 'react';

const ServerType = {
    name: React.PropTypes.string.isRequired,
    authEndpoint: React.PropTypes.string.isRequired,
    tokenEndpoint: React.PropTypes.string,
    clientID: React.PropTypes.string.isRequired,
    clientSecret: React.PropTypes.string.isRequired,
    authCode: React.PropTypes.string,
    authToken: React.PropTypes.string
};

export default ServerType;
