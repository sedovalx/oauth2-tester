import { connect } from 'react-redux'
import ServerItem from 'component/ServerItem'
import asyncApiDeleteServer from 'actions/asyncApiDeleteServer'
import { serverModalShow } from 'actions/serverModal'

const mapStateToProps = () => { return {} };

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (server) => {
            dispatch(serverModalShow(server))
        },
        onDelete: (server) => {
            dispatch(asyncApiDeleteServer(server))
        }
    };
};

const ServerItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerItem);

export default ServerItemContainer
