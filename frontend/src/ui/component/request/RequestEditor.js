import React from 'react'
import Icon from 'react-fa'
import classNames from 'classnames'
import AddressBlock from 'component/request/AddressBlock'

const RequestEditor = React.createClass({
    render() {
        return (
            <div className="request-editor">
                <AddressBlock />
                <div className="params">

                </div>
                <div className="headers">

                </div>
                <div className="body">

                </div>
                <div className="commands">

                </div>
            </div>
        );
    }
});

export default RequestEditor;