import React from 'react'
import Modal from 'react-modal'
import ServerEditor from 'component/editors/ServerEditor'

const customStyles = {
    content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
    },
    overlay: {
        zIndex                : 2
    }
};

const ServerEditorModal = React.createClass({
    render(){
        const {
            data,
            onCancel,
            onAccept
        } = this.props;
        return (
            <Modal isOpen={data != null} style={customStyles} onRequestClose={onCancel}>
                <ServerEditor onSubmit={onAccept} onCancel={onCancel} />
            </Modal>
        );
    }
});
ServerEditorModal.propTypes = {
    data: React.PropTypes.object,
    onCancel: React.PropTypes.func.isRequired,
    onAccept: React.PropTypes.func.isRequired
};

export default ServerEditorModal;