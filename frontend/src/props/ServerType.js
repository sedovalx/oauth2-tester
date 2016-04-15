import React from 'react';

const ServerType = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    authEndpoint: React.PropTypes.string.isRequired,
    tokenEndpoint: React.PropTypes.string,
    clientID: React.PropTypes.string.isRequired,
    clientSecret: React.PropTypes.string.isRequired
};

export default ServerType;
