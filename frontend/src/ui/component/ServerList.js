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
                </div>
            </div>
        );
    }
});
ServerList.propType = {
    servers: React.PropTypes.arrayOf(React.PropTypes.shape(ServerType)).isRequired
}

export default ServerList;
