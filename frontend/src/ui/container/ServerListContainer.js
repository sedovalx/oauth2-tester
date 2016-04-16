import { connect } from 'react-redux';
import requestServersAsync from 'actions/requestServersAsync';
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
            dispatch(requestServersAsync())
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