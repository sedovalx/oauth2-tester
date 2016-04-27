import React                from 'react'
import { connect }          from 'react-redux'
import { createSelector }   from 'reselect'
import { createAction }     from 'redux-actions'

import actionTypes          from '/actions/actionTypes'
import { suggestUri }       from '/services/requestSuggester'

/**
 * Dummy component for updating of the current request in the store
 */
const RequestUpdaterComponent = React.createClass({
    componentDidMount(){
        this.props.onChange(this.props.request);
    },
    componentWillReceiveProps(nextProps){
        nextProps.onChange(nextProps.request);
    },
    render(){
        return <div className="request-updater"></div>
    }
});

const getRequest = createSelector(
    // watch for current server, flow type and settings
    [ state => state.current.server, state => state.current.flow, state => state.settings ],
    // rebuild request if dependencies changed
    (server, flow, settings) => {
        return suggestUri(server, flow, settings.callbackUri, settings.username, settings.password);
    }
);

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    onChange: (request) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_FULL)(request));
    }    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestUpdaterComponent)