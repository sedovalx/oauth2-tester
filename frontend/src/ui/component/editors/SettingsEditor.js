import React from 'react'
import Icon from 'react-fa'
import { reduxForm } from 'redux-form'
import classNames from 'classnames'
import SettingsType from 'props/SettingsType'

const SettingsEditor = React.createClass({
    render() {
        const {
            fields: {
                currentFlow,
                username,
                password,
                callbackUri
            },
            flows,
            error,
            handleSubmit,
            submitting,
            onCancel
        } = this.props;
        console.log(this.props);
        return (
            <div className="settings-editor">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Selected flow type</label>
                        <div className="col-md-9">
                            <select className="form-control" {...currentFlow}>
                                <option value="">Select a flow type</option>
                                {flows.map(f => <option value={f.code} key={f.code}>{f.desc}</option>)}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});
// SettingsEditor.propTypes = {
//     fields: React.PropTypes.shape({
//         settings: React.PropTypes.shape(SettingsType).isRequired
//     }).isRequired,
//     handleSubmit: React.PropTypes.func.isRequired,
//     resetForm: React.PropTypes.func.isRequired,
//     submitting: React.PropTypes.bool.isRequired,
//     onCancel: React.PropTypes.func.isRequired,
//     error: React.PropTypes.string
// };

export default SettingsEditor;


