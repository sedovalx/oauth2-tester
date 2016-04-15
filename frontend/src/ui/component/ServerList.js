import React from 'react';
import Loader from 'react-loader';
import ServerItem from 'component/ServerItem';
import ServerType from 'props/ServerType';

const ServerList = React.createClass({
    componentDidMount() {
        this.props.onInit()
    },
    render() {
        const servers = this.props.servers;
        const isFetching = this.props.isFetching;
        return (
            <Loader loaded={!isFetching}>
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
            </Loader>
        );
    }
});
ServerList.propType = {
    servers: React.PropTypes.arrayOf(React.PropTypes.shape(ServerType)).isRequired,
    isFetching: React.PropTypes.bool
};

export default ServerList;
