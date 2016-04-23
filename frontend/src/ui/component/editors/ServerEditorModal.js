import React from 'react'
import Modal from 'react-modal'
import ServerEditorContainer from 'container/editors/ServerEditorContainer'

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

const ServerEditorModal = React.createClass({
    render(){
        const {
            isOpen,
            onCancel
        } = this.props;
        return (
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={onCancel}>
                <ServerEditorContainer />
            </Modal>
        );
    }
});
ServerEditorModal.propTypes = {
    data: React.PropTypes.object,
    onCancel: React.PropTypes.func.isRequired
};

export default ServerEditorModal;