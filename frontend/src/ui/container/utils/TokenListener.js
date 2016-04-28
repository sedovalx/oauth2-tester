import React                from 'react'
import { connect }          from 'react-redux'
import { createSelector }   from 'reselect'

import asyncApiSaveServer   from '/actions/asyncApiSaveServer'
import TokenParser          from '/services/TokenParser'

const TokenListenerComponent = React.createClass({
    shouldComponentUpdate(newProps){
        if (newProps && newProps.response && (!this.props.response || (this.props.response !== newProps.response))) {
            newProps.onResponseUpdate(newProps.request, newProps.response, newProps.server);
        }
        return false;
    },
    render(){
        return <div className="token-listener"></div>
    }
});

const getRequest = createSelector([state => state.exchangeLog.request], _ => _);

const getResponse = createSelector([state => state.exchangeLog.response], _ => _);

const getServer = createSelector([state => state.current.server], _ => _);

const mapStateToProps = state => ({
    request: getRequest(state),
    response: getResponse(state),
    server: getServer(state)
});

export const mapDispatchToProps = dispatch => ({
    onResponseUpdate: (request, response, server) => {
        if (server && request && request.acquireToken && response && response.body){
            const bodyObj = TokenParser.parseBody(response.headers.get('Content-Type'), response.body);
            if (bodyObj && bodyObj.access_token){
                server.authToken = bodyObj.access_token;
                server.tokenType = bodyObj.token_type;
                dispatch(asyncApiSaveServer(server));
            }
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TokenListenerComponent);

