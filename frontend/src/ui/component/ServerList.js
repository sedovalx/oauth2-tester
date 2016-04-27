import React                from 'react'
import Loader               from 'react-loader'
import Icon                 from 'react-fa'

import ServerItemContainer  from '/container/ServerItemContainer'
import ServerType           from '/props/ServerType'

const ServerList = React.createClass({
    render() {
        const servers = this.props.servers;
        const isFetching = this.props.isFetching;
        return (
            <div className="server-list">
                <Loader loaded={!isFetching} scale={0.5}>
                    <div className="servers panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Select a server <Icon name="hand-o-down"/> Then push the blue button <Icon name="hand-o-right"/></h3>
                        </div>
                        <div className="list-group">
                            {servers.map((s, idx) => {
                                return <ServerItemContainer key={idx} server={s} />
                            })}
                            <a href="#" className="list-group-item btn-add-server" onClick={this.props.onAdd}>
                                <div>
                                    <Icon name="plus" />{' '}<strong>Add server</strong>
                                </div>
                            </a>
                            <a href="#" className="list-group-item btn-add-server" onClick={this.props.onAddDefault}>
                                <div>
                                    <Icon name="paw" />{' '}<strong>Add test data</strong>
                                </div>
                            </a>
                        </div>
                    </div>

                </Loader>
            </div>
        );
    }
});
ServerList.propType = {
    servers: React.PropTypes.arrayOf(React.PropTypes.shape(ServerType)).isRequired,
    isFetching: React.PropTypes.bool,
    onInit: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func.isRequired
};

export default ServerList;
