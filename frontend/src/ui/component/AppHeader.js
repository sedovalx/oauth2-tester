import React from 'react';

const AppHeader = ({title}) => (
    <div className="app-header page-header">
        <h1>{title}</h1>
        <button className="btn btn-primary" type="submit">Button</button>
    </div>
);

AppHeader.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default AppHeader;