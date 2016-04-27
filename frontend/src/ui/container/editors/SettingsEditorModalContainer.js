import { connect }              from 'react-redux'

import { settingsModalClose }   from '/actions/settingsModal'
import SettingsEditorModal      from '/component/editors/SettingsEditorModal'

const mapStateToProps = (state) => {
    return {
        isOpen: state.modals.editor.settings
    }
};

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(settingsModalClose())
});

const SettingsEditorModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsEditorModal);

export default SettingsEditorModalContainer;
