import React from 'react'
import Icon from 'react-fa'
import { reduxForm } from 'redux-form'
import classNames from 'classnames'

const ServerEditor = React.createClass({
    render(){
        const {
            fields: { name, authEndpoint, tokenEndpoint, clientID, clientSecret },
            error,
            resetForm,
            handleSubmit,
            submitting
        } = this.props;
        const props = [
            { obj: name, desc: "Name" },
            { obj: authEndpoint, desc: "Authorization endpoint" },
            { obj: tokenEndpoint, desc: "Token endpoint" },
            { obj: clientID, desc: "Client ID" },
            { obj: clientSecret, desc: "Client secret" }
        ];
        return (
            <div className="server-editor ">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    {
                        props.map((p, idx) => (
                            <div key={idx} className={classNames('form-group', {'has-error': p.obj.touched && p.obj.error})}>
                                <label className="col-md-3 control-label">{p.desc}</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" placeholder={p.desc} {...p.obj} aria-describedby={"helpBlock_" + p.obj.name}/>
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
                            <button type="button" className="btn btn-default" disabled={submitting} onClick={this.props.onCancel}>
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
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'server-editor',
    fields: ['name', 'authEndpoint', 'tokenEndpoint', 'clientID', 'clientSecret']
})(ServerEditor);
