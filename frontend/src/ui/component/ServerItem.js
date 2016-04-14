import React from 'react';

const ServerItem = React.createClass({
    render(){

    }
});
ServerItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    authEndpoint: React.PropTypes.string.isRequired,
    tokenEndpoint: React.PropTypes.string,
    clientID: React.PropTypes.string.isRequired,
    clientSecret: React.PropTypes.string.isRequired
};

export default ServerItem;
