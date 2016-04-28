import React from 'react'

const AuthInfo = React.createClass({
    render(){
        const { code, token } = this.props;
        return (
            <div className="auth-info">
                {code && (
                    <div className="alert alert-info" role="alert">
                        <strong>Auth code: </strong>
                        {code}
                    </div>
                )}
                {token && (
                    <div className="alert alert-success" role="alert">
                        <strong>Auth token: </strong>
                        {token}
                    </div>
                )}
            </div>
        );
    }
});
AuthInfo.propTypes = {
    code: React.PropTypes.string,
    token: React.PropTypes.string
};

export default AuthInfo;
