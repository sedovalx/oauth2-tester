import { connect } from 'react-redux';
import { fetchServers } from 'actions/actions';
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
            dispatch(fetchServers())
        }
    };
};

const ServerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerList);

export default ServerListContainer