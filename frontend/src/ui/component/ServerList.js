import React from 'react';
import Loader from 'react-loader';
import Icon from 'react-fa'
import ServerItemContainer from 'container/ServerItemContainer';
import ServerType from 'props/ServerType';

const ServerList = React.createClass({
    componentDidMount() {
        this.props.onInit()
    },
    render() {
        const servers = this.props.servers;
        const isFetching = this.props.isFetching;
        return (
            <div className="server-list">
                <Loader loaded={!isFetching} scale={0.5}>
                    <div className="list-group">
                        {servers.map(s => {
                            return <ServerItemContainer key={s.id} server={s} />
                        })}
                        <a href="#" className="list-group-item btn-add-server" onClick={this.props.onAdd}>
                            <div>
                                <Icon name="plus" />{' '}<strong>Add server</strong>
                            </div>
                        </a>
                        <a href="#" className="list-group-item btn-add-server" onClick={this.props.onAddDefault}>
                            <div>
                                <Icon name="rocket" />{' '}<strong>Add default</strong>
                            </div>
                        </a>
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
