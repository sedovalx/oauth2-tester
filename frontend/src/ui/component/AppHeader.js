import React        from 'react'
import SettingsType from '/props/SettingsType'

const AppHeader = React.createClass({
    render() {
        const {
            settings: {
                title
            },
            onSettingsClick
        } = this.props;
        return (
            <div className="page-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <h1>{title}</h1>
                        </div>
                        <div className="col-md-8">
                            <button type="button" className="app-settings btn btn-link" onClick={onSettingsClick}>Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
});

AppHeader.propTypes = {
    settings: React.PropTypes.shape(SettingsType).isRequired,
    onSettingsClick: React.PropTypes.func.isRequired
};

export default AppHeader;