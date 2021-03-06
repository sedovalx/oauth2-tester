import React        from 'react'
import Icon         from 'react-fa'
import classNames   from 'classnames'

const ServerEditor = React.createClass({
    render(){
        const {
            fields: { name, authEndpoint, tokenEndpoint, clientID, clientSecret, authCode, authToken, tokenType },
            error,
            handleSubmit,
            submitting,
            onCancel
        } = this.props;
        const props = [
            { obj: name, desc: "Name" },
            { obj: authEndpoint, desc: "Authorization endpoint" },
            { obj: tokenEndpoint, desc: "Token endpoint" },
            { obj: clientID, desc: "Client ID" },
            { obj: clientSecret, desc: "Client secret" },
            { obj: authCode, desc: "Auth code" },
            { obj: authToken, desc: "Auth token" },
            { obj: tokenType, desc: "Token type" }
        ];
        return (
            <div className="server-editor ">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    {
                        props.map((p, idx) => (
                            <div key={idx} className={classNames('form-group', {'has-error': p.obj.touched && p.obj.error})}>
                                <label className="col-md-3 control-label">{p.desc}</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" placeholder={p.desc} aria-describedby={"helpBlock_" + p.obj.name} {...p.obj}/>
                                    <span id={"helpBlock_" + p.obj.name} className={classNames('help-block', { 'show': p.obj.touched && p.obj.error })}>{p.obj.error}</span>
                                </div>
                            </div>
                        ))
                    }
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
        );
    }
});
ServerEditor.propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
};

export default ServerEditor;