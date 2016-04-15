import React from 'react';
import ServerType from 'props/ServerType'

const ServerEditor = React.createClass({
    render(){
        return (
            <div className="server-editor">
                <button className="btn btn-default" type="button" onClick={this.props.onAccept}>Close</button>
            </div>
        );
    }
});
ServerEditor.propTypes = {
    server: React.PropTypes.shape(ServerType),
    onAccept: React.PropTypes.func,
    onCancel: React.PropTypes.func
};

export default ServerEditor;
