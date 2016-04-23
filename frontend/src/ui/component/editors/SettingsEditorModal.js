import React from 'react'
import Modal from 'react-modal'
import SettingsEditorContainer from 'container/editors/SettingsEditorContainer'

const customStyles = {
    content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex                : 2
    }
};

const SettingsEditorModal = React.createClass({
    render(){
        const {
            isOpen,
            onCancel
        } = this.props;
        return (
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={onCancel}>
                <SettingsEditorContainer />
            </Modal>
        );
    }
});
SettingsEditorModal.propTypes = {
    data: React.PropTypes.object,
    onCancel: React.PropTypes.func.isRequired
};

export default SettingsEditorModal;