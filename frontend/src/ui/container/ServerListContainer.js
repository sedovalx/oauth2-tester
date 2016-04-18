import { connect } from 'react-redux'
import asyncApiFetchServers from 'actions/asyncApiFetchServers'
import asyncApiAddDefaultServers from 'actions/asyncApiAddDefaultServers'
import { addServerModalShow } from 'actions/addServerModal'
import ServerList from 'component/ServerList'

const mapStateToProps = (state) => {
    return {
        servers: state.servers.items,
        isFetching: state.servers.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: () => {
            dispatch(asyncApiFetchServers())
        },
        onAdd: () => {
            dispatch(addServerModalShow())
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