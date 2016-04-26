import React from 'react'
import Loader from 'react-loader'
import AppHeaderContainer from 'container/AppHeaderContainer'
import RequestEditorContainer from 'container/request/RequestEditorContainer'
import ServerEditorModalContainer from 'container/editors/ServerEditorModalContainer'
import SettingsEditorModalContainer from 'container/editors/SettingsEditorModalContainer'
import ErrorNotificationContainer from 'container/ErrorNotificationContainer'
import ServerListContainer from 'container/ServerListContainer'
import AuthInfoContainer from 'container/AuthInfoContainer'
import ExchangeLogContainer from 'container/ExchangeLogContainer'
import RequestUpdater from 'container/utils/RequestUpdater'

import 'styles/main.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.onInit(this.props.state);        
    }
    render() {
        return (
            <div className="app-container">
                <RequestUpdater />
                <Loader loaded={!this.props.isBusy} length={50} width={3} radius={30} trail={60}>
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
                </Loader>
                <ServerEditorModalContainer />
                <SettingsEditorModalContainer />
                <ErrorNotificationContainer />
            </div>
        )
    }
}

export default App;
