import React        from 'react'
import Icon         from 'react-fa'
import classNames   from 'classnames'

import ServerType   from '/props/ServerType'

const ServerItem = React.createClass({
    render(){
        const {
            server: { 
                name,
                authEndpoint,
                isBusy
            },
            selected,
            onEdit,
            onDelete,
            onSelected
        } = this.props;
        const server = this.props.server;
        const isSelected = selected && selected.name === server.name;
        const buttonStyle = "btn-" + (isSelected ? "primary" : "default");
        return (
            <a href="#" className={classNames("list-group-item", "server-item", { "is-busy": isBusy }, { "active": isSelected })} onClick={() => onSelected(server)}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <div className="img-container">
                                <img src={`http://www.google.com/s2/favicons?domain=${authEndpoint}`} alt={name}/>
                            </div>
                        </div>
                        <div className="col-md-8 name">{name}</div>
                        <div className="col-md-3 actions">
                            <div className="btn-group pull-right" role="group">
                                <button type="button" className={classNames("btn", "no-borders", buttonStyle)}
                                        data-toggle="tooltip" data-placement="left" title="Edit"
                                        onClick={onEdit}
                                        disabled={isBusy}>
                                    <Icon name="pencil"/>
                                </button>
                                <button type="button" className={classNames("btn", "no-borders", buttonStyle)}  
                                        data-toggle="tooltip" data-placement="left" title="Delete"
                                        onClick={() => onDelete(server)}
                                        disabled={isBusy}>
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
    selected: React.PropTypes.shape(ServerType),
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onSelected: React.PropTypes.func.isRequired
};

export default ServerItem;
