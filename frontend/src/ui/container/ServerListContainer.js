import { connect } from 'react-redux';
import asyncFetchServers from 'actions/asyncFetchServers';
import { addServerModalShow } from 'actions/addServer'
import ServerList from 'component/ServerList';

const mapStateToProps = (state) => {
    return {
        servers: state.servers.items,
        isFetching: state.servers.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: () => {
            dispatch(asyncFetchServers())
        },
        onAdd: () => {
            dispatch(addServerModalShow())
        }
    };
};

const ServerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerList);

export default ServerListContainer