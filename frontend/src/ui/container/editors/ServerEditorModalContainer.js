import { connect } from 'react-redux'
import { addServerModalCancel, addServerModalAccept } from 'actions/addServerModal'
import ServerEditorModal from 'component/editors/ServerEditorModal'
import validateServer from 'validation/server'
import asyncApiSaveServer from 'actions/asyncApiSaveServer'

const mapStateToProps = (state) => {
    return {
        isOpen: state.modals.editor.server
    }
};

const mapDispatchToProps = function(dispatch){
    return {
        onCancel: function(){
            dispatch(addServerModalCancel());
        },
        onAccept: (fields) => {
            return validateServer(fields)
                .then(() => dispatch(asyncApiSaveServer(fields)))
                .then(() => dispatch(addServerModalAccept()))
                .catch(err => Promise.reject(err instanceof Error ? { _error: err.message } : err));
        }
    }
};

const ServerEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerEditorModal);

export default ServerEditorModalContainer;
