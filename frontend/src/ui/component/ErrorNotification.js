import React from 'react'
import NotificationSystem from 'react-notification-system'
import StackParser from 'stacktrace-js'

function printErrorMessage(e, stackFrames) {
    let message = e.toString();
    var stringifiedStack = stackFrames.map(function(sf) {
        return sf.toString();
    }).join('\n');
    console.error(message + '\n' + stringifiedStack);
}

const ErrorNotification = React.createClass({
    _notificationSystem: null,

    componentDidMount: function() {
        this._notificationSystem = this.refs.notificationSystem;
    },
    componentWillReceiveProps(newProps) {
        if (newProps.lastError) {
            StackParser.fromError(newProps.lastError)
                .then(stackFrames => {
                    // print
                    printErrorMessage(newProps.lastError, stackFrames);
                    // then show
                    this._notificationSystem.addNotification({
                        title: 'Error',
                        message: newProps.lastError.toString(),
                        level: 'error',
                        position: 'bl',
                        autoDismiss: 0,
                        onRemove: () => this.props.markErrorAsRead(newProps.lastError)
                    });
                }).catch(err => console.error(err));

        }  
    },
    shouldComponentUpdate(nextProps) {
        return this.props.lastError !== nextProps.lastError;
    },
    render: function() {
        return (
            <div className="error-notify-area">
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
});

export default ErrorNotification;
