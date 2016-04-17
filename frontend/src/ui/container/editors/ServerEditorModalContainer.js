import { connect } from 'react-redux'
import { addServerModalCancel, addServerModalAccept } from 'actions/addServerModal'
import ServerEditorModal from 'component/editors/ServerEditorModal'
import validateServer from 'validation/server'

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
            return validateServer(fields).then(() => dispatch(addServerModalAccept()))
        }
    }
};

const ServerEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerEditorModal);

export default ServerEditorModalContainer;
