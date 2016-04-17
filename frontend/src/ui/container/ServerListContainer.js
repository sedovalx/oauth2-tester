import { connect } from 'react-redux';
import asyncApiRequestServers from 'actions/asyncApiRequestServers';
import { addServerModalShow } from 'actions/addServerModal'
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
            dispatch(asyncApiRequestServers())
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