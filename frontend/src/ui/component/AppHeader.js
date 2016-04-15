import React from 'react';

const AppHeader = ({title}) => (
    <div className="app-header page-header">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-11">
                    <h1>{title}</h1>
                </div>
                <div className="col-md-1">
                    <button type="button" className="app-settings btn btn-link">Settings</button>
                </div>
            </div>
        </div>
    </div>
);

AppHeader.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default AppHeader;