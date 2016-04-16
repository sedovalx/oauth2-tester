import React from 'react'
import { reduxForm } from 'redux-form'

const ServerEditor = React.createClass({
    render(){
        const {
            fields: { name, authEndpoint, tokenEndpoint, clientID, clientSecret },
            handleSubmit,
            resetForm,
            submitting
        } = this.props;
        return (
            <div className="server-editor ">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Name</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Name" {...name}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Authorization endpoint</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Authorization endpoint" {...authEndpoint}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Token endpoint</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Token endpoint" {...tokenEndpoint}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Client ID</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Client ID" {...clientID}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Client secret</label>
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Client secret" {...clientSecret}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="btn-group pull-right" role="group">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? <i/> : <i/>} Submit
                            </button>
                            <button type="button" className="btn btn-default" disabled={submitting} onClick={this.props.onCancel}>
                                Cancel
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
