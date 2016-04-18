import React from 'react'
import Icon from 'react-fa'
import ServerType from 'props/ServerType'
import classNames from 'classnames'

const ServerItem = React.createClass({
    render(){
        const server = this.props.server;
        return (
            <a href="#" className={classNames("list-group-item", "server-item", { "is-busy": server.isBusy })}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="img-container">
                                <img src={`http://www.google.com/s2/favicons?domain=${server.authEndpoint}`} alt={server.name}/>
                            </div>
                        </div>
                        <div className="col-md-7 name">{server.name}</div>
                        <div className="col-md-3 actions">
                            <div className="btn-group pull-right" role="group">
                                <button type="button" className="btn btn-default no-borders"
                                        data-toggle="tooltip" data-placement="left" title="Edit"
                                        onClick={() => this.props.onEdit(server)}
                                        disabled={server.isBusy}>
                                    <Icon name="pencil"/>
                                </button>
                                <button type="button" className="btn btn-default no-borders"
                                        data-toggle="tooltip" data-placement="left" title="Delete"
                                        onClick={() => this.props.onDelete(server)}
                                        disabled={server.isBusy}>
                                    <Icon name="trash-o"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        );
    }
});
ServerItem.propTypes = {
    server: React.PropTypes.shape(ServerType).isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
};

export default ServerItem;
