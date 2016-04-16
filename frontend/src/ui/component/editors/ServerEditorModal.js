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
        transform             : 'translate(-50%, -50%)'
    }
};

const ServerEditorModal = React.createClass({
    render(){
        return (
            <Modal isOpen={this.props.isOpen} style={customStyles} onRequestClose={this.props.onCancel}>
                <ServerEditor onSubmit={this.props.onAccept} onCancel={this.props.onCancel} />
            </Modal>
        );
    }
});
ServerEditorModal.propTypes = {
    isOpen: React.PropTypes.bool,
    onCancel: React.PropTypes.func.isRequired,
    onAccept: React.PropTypes.func.isRequired
};

export default ServerEditorModal;