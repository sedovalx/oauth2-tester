import React from 'react'
import Icon from 'react-fa'

const AuthApiInitializer = React.createClass({
    render() {
        const {
            isServerSelected,
            selectedServerName,
            onExecute
        } = this.props;
        return (
            <div className="auth-initializer-input">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Scopes" ref="scopeInput"/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" title="Authorize APIs" disabled={!isServerSelected} onClick={() => onExecute(selectedServerName, this.refs.scopeInput.value)}>
                            <Icon name="paper-plane-o"/>
                        </button>
                    </span>
                </div>
            </div>
        )
    }
});


export default AuthApiInitializer;
