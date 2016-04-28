import React        from 'react'
import FlowType     from '/props/FlowType'

const SettingsPane = React.createClass({
    render() {
        const {
            flow,
            onSettingsClick
        } = this.props;
        return (
            <div className="settings-pane panel panel-default">
                <div className="panel-body">
                    <div className="form-inline">
                        <div className="form-group">
                            <label className="control-label">Current flow: </label> {flow.desc}
                        </div>
                        <button type="button" className="app-settings btn btn-link" onClick={onSettingsClick}>change it</button>
                    </div>
                </div>
            </div>
        );
    }
});

SettingsPane.propTypes = {
    flow: React.PropTypes.shape(FlowType).isRequired,
    onSettingsClick: React.PropTypes.func.isRequired
};

export default SettingsPane;