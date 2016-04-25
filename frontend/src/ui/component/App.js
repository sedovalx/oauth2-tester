import React from 'react'
import AppHeaderContainer from 'container/AppHeaderContainer'
import RequestEditorContainer from 'container/request/RequestEditorContainer'
import ServerEditorModalContainer from 'container/editors/ServerEditorModalContainer'
import SettingsEditorModalContainer from 'container/editors/SettingsEditorModalContainer'
import ErrorNotificationContainer from 'container/ErrorNotificationContainer'
import ServerListContainer from 'container/ServerListContainer'
import AuthInfoContainer from 'container/AuthInfoContainer'
import ExchangeLogContainer from 'container/ExchangeLogContainer'

import 'styles/main.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.onInit(this.props.state);        
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-header">
                    <AppHeaderContainer />
                </div>
                <div className="app-main">
                    <div className="app-main-row">
                        <div className="app-pane left">
                            <ServerListContainer />
                            <AuthInfoContainer />
                        </div>
                        <div className="app-pane right">
                            <RequestEditorContainer />
                            <ExchangeLogContainer />
                        </div>
                    </div>
                </div>
                <ServerEditorModalContainer />
                <SettingsEditorModalContainer />
                <ErrorNotificationContainer />
            </div>
        )
    }
}

export default App;
