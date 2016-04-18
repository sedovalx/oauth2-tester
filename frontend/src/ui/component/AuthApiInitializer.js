import React from 'react'
import Icon from 'react-fa'

const AuthApiInitializer = React.createClass({
    render() {
        return (
            <div className="auth-initializer-input">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Scopes"/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" title="Authorize APIs">
                            <Icon name="paper-plane-o"/>
                        </button>
                    </span>
                </div>
            </div>
        )
    }
});

export default AuthApiInitializer;
