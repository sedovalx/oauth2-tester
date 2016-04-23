import React from 'react'
import AppHeaderContainer from 'container/AppHeaderContainer'
import SectionListContainer from 'container/SectionListContainer'
import RequestEditor from 'component/request/RequestEditor'
import ServerEditorModalContainer from 'container/editors/ServerEditorModalContainer'
import SettingsEditorModalContainer from 'container/editors/SettingsEditorModalContainer'

import 'styles/main.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.onInit();        
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
                            <SectionListContainer />
                        </div>
                        <div className="app-pane right">
                            <RequestEditor />
                        </div>
                    </div>
                </div>
                <ServerEditorModalContainer />
                <SettingsEditorModalContainer />
            </div>
        )
    }
}

export default App;
