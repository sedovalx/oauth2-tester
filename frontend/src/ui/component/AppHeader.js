import React from 'react';

const AppHeader = ({title}) => (
    <div className="app-header page-header">
        <h1>{title}</h1>
    </div>
);

AppHeader.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default AppHeader;