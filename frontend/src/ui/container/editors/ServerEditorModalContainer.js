import { connect } from 'react-redux'
import { serverModalClose } from 'actions/serverModal'
import ServerEditorModal from 'component/editors/ServerEditorModal'
import validateServer from 'validation/server'
import asyncApiCreateServer from 'actions/asyncApiCreateServer'
import asyncApiUpdateServer from 'actions/asyncApiUpdateServer'

const mapStateToProps = (state) => {
    return {
        data: state.modals.editor.server
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        onCancel: function(){
            dispatch(serverModalClose());
        },
        onAccept: (fields) => {
            return validateServer(fields)
                .then(() => {
                    return fields.id
                        ? dispatch(asyncApiUpdateServer(fields))
                        : dispatch(asyncApiCreateServer(fields));
                })
                .then(() => dispatch(serverModalClose()))
                .catch(err => Promise.reject(err instanceof Error ? { _error: err.message } : err));
        }
    }
};

const ServerEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerEditorModal);

export default ServerEditorModalContainer;
