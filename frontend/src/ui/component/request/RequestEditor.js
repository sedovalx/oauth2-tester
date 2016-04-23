import React from 'react'
import Icon from 'react-fa'
import classNames from 'classnames'
import AddressBlockContainer from 'container/request/AddressBlockContainer'
import ParamsBlock from 'component/request/ParamsBlock';

const RequestEditor = React.createClass({
    render() {
        const {
            fields: {
                method,
                endpoint,
                params,
                headers,
                body
            }
        } = this.props;
        return (
            <div className="request-editor">
                <form className="form-horizontal">
                    <AddressBlockContainer method={method} endpoint={endpoint} />
                    <ParamsBlock items={params}/>
                    <div className="headers">

                    </div>
                    <div className="body">

                    </div>
                    <div className="commands">

                    </div>
                </form>
            </div>
        );
    }
});

export default RequestEditor;