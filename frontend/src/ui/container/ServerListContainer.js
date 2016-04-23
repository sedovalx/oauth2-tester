import { connect } from 'react-redux'
import asyncApiFetchServers from 'actions/asyncApiFetchServers'
import asyncApiAddDefaultServers from 'actions/asyncApiAddDefaultServers'
import { serverModalShow } from 'actions/serverModal'
import ServerList from 'component/ServerList'

const mapStateToProps = (state) => {
    return {
        servers: state.refs.servers.items,
        isFetching: state.servers.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: () => {
            dispatch(asyncApiFetchServers())
        },
        onAdd: () => {
            dispatch(serverModalShow())
        },
        onAddDefault: () => {
            dispatch(asyncApiAddDefaultServers())
        }
    };
};

const ServerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerList);

export default ServerListContainer