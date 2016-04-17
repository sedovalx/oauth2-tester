import React from 'react';
import Icon from 'react-fa'
import ServerType from 'props/ServerType';

const ServerItem = React.createClass({
    render(){
        const server = this.props.server;
        return (
            <a href="#" className="list-group-item server-item">
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
                                <button type="button" className="btn btn-default no-borders" data-toggle="tooltip" data-placement="left" title="Edit">
                                    <Icon name="pencil"/>
                                </button>
                                <button type="button" className="btn btn-default no-borders" data-toggle="tooltip" data-placement="left" title="Delete">
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
    server: React.PropTypes.shape(ServerType).isRequired
};

export default ServerItem;
