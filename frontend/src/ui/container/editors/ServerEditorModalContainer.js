import { connect } from 'react-redux'
import { addServerModalCancel, addServerModalAccept } from 'actions/addServerModal'
import ServerEditorModal from 'component/editors/ServerEditorModal'

const mapStateToProps = (state) => {
    return {
        isOpen: state.modals.editor.server
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
