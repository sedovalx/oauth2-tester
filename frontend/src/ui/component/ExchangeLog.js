import React from 'react'
import Loader from 'react-loader'
import ReqonseType from 'props/ReqonseType'

const ExchangeLog = React.createClass({
    render(){
        const {
            request,
            response,
            isBusy
        } = this.props;
        return (
            <div className="exchange-log">
                <div>{request && JSON.stringify(request)}</div>
                <Loader loaded={!isBusy} scale={0.5}>
                    <div>{response && JSON.stringify(response)}</div>
                </Loader>
            </div>
        )
    }
});
ExchangeLog.propTypes = {
    request: React.PropTypes.shape(ReqonseType),
    response: React.PropTypes.shape(ReqonseType),
    isBusy: React.PropTypes.bool
};



export default ExchangeLog;
