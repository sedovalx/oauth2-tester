import { connect }          from 'react-redux'

import { serverModalClose } from '/actions/serverModal'
import ServerEditorModal    from '/component/editors/ServerEditorModal'

const mapStateToProps = (state) => {
    return {
        isOpen: state.modals.editor.server
    }
};

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(serverModalClose())
});

const ServerEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerEditorModal);

export default ServerEditorModalContainer;
