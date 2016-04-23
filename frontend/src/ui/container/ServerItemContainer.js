import { connect } from 'react-redux'
import ServerItem from 'component/ServerItem'
import asyncApiDeleteServer from 'actions/asyncApiDeleteServer'
import { serverModalShow } from 'actions/serverModal'
import { serverSelected } from 'actions/serverSelected'

const mapStateToProps = (state) => { 
    return {
        selected: state.servers.selected
    } 
};



const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (server) => {
            dispatch(serverModalShow(server))
        },
        onDelete: (server) => {
            dispatch(asyncApiDeleteServer(server))
        },
        onSelected: (server) => {
            dispatch(serverSelected(server))
        }
    };
};

const ServerItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerItem);

export default ServerItemContainer
