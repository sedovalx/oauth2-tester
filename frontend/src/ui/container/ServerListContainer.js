import { connect } from 'react-redux';
import ServerList from 'component/ServerList';

const mapStateToProps = (state) => {
    return {
        servers: state.servers
    }
};

const ServerListContainer = connect(
    mapStateToProps
)(ServerList);

export default ServerListContainer;