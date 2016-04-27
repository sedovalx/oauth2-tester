import React            from 'react'
import Icon             from 'react-fa'
import classNames       from 'classnames'
import Clipboard        from 'clipboard'

const SettingsEditor = React.createClass({
    componentDidMount() {
        this.clipboardBtnId = "settings-editor-clipboard-btn-id";
        this.clipboard = new Clipboard('#' + this.clipboardBtnId);
    },

    componentWillUnmount() {
        this.clipboard && this.clipboard.destroy();
    },

    render() {
        const {
            fields: {
                currentFlowStr,
                username,
                password
            },
            flows,
            callbackUri,
            error,
            handleSubmit,
            submitting,
            onCancel
        } = this.props;
        const currentFlow = JSON.parse(currentFlowStr.value || currentFlowStr.initialValue);
        return (
            <div className="settings-editor">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Callback Uri</label>
                        <div className="col-md-9">
                            <div className="input-group">
                                <input id="callbackUri" type="text" className="form-control" readOnly={true} value={callbackUri} />
                                <span className="input-group-btn">
                                    <button id={this.clipboardBtnId} className="btn btn-default btn-clipboard" type="button"
                                            data-clipboard-target="#callbackUri" title="Copy to clipboard">
                                        <Icon name="clipboard"/>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Selected flow type</label>
                        <div className="col-md-9">
                            <select className="form-control" {...currentFlowStr}>
                                {flows.map(f => <option value={JSON.stringify(f)} key={f.code}>{f.desc}</option>)}
                            </select>
                        </div>
                    </div>
                    {currentFlow && currentFlow.code === "RESOURCE_FLOW" && (
                        <div>
                            <p>You should provide your credentials to use the password credentials flow type</p>
                            <div className={classNames('form-group', {'has-error': username.touched && username.error})}>
                                <label className="col-md-3 control-label">User login</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" placeholder="User login" aria-describedby="helpBlock_username" {...username}/>
                                    <span id="helpBlock_username" className={classNames('help-block', { 'show': username.touched && username.error })}>{username.error}</span>
                                </div>
                            </div>
                            <div className={classNames('form-group', {'has-error': password.touched && password.error})}>
                                <label className="col-md-3 control-label">User password</label>
                                <div className="col-md-9">
                                    <input type="password" className="form-control" placeholder="User password" aria-describedby="helpBlock_password" {...password}/>
                                    <span id="helpBlock_password" className={classNames('help-block', { 'show': password.touched && password.error })}>{password.error}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    { error && <div className="alert alert-danger" role="alert">{error}</div> }
                    <div className="form-group">
                        <div className="btn-group pull-right" role="group">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? <Icon spin name="cog"/> : <Icon name="check"/>} Submit
                            </button>
                            <button type="button" className="btn btn-default" disabled={submitting} onClick={onCancel}>
                                <Icon name="times"/> Cancel
                            </button>
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


