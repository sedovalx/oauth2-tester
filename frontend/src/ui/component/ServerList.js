import React from 'react';
import ServerItem from 'component/ServerItem';
import ServerType from 'props/ServerType';

const ServerList = React.createClass({
    render() {
        const servers = this.props.servers;
        return (
            <div className="server-list">
                <div className="list-group">
                    {servers.map(s => {
                        return <ServerItem key={s.id} server={s} />
                    })}
                    <a href="#" className="list-group-item btn-add-server">
                        <div>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span><strong>Add server</strong>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
});
ServerList.propType = {
    servers: React.PropTypes.arrayOf(React.PropTypes.shape(ServerType)).isRequired
}

export default ServerList;
