import { connect } from 'react-redux'
import { addServerModalCancel, addServerModalAccept } from 'actions/addServer'
import ServerEditorModal from 'component/editors/ServerEditorModal'

const mapStateToProps = (state) => {
    return {
        isOpen: state.modals.editor.server,
        server: state.editors.server
    }
};

const mapDispatchToProps = (dispatch) => {
   return {
       onCancel: () => {
            dispatch(addServerModalCancel());
       },
       onAccept: () => {
           dispatch(addServerModalAccept());
       }
   }
};

const ServerEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerEditorModal);

export default ServerEditorModalContainer;
