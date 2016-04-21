import React from 'react'
import AppHeaderContainer from 'container/AppHeaderContainer'
import PhaseListContainer from 'container/PhaseListContainer'
import ServerEditorModalContainer from 'container/editors/ServerEditorModalContainer'

import 'styles/main.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.onInit();        
    }

    render() {
        return (
            <div>
                <AppHeaderContainer />
                <div className="app-main container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <PhaseListContainer />
                        </div>
                    </div>
                </div>
                <ServerEditorModalContainer />
            </div>
        )
    }
}

export default App;
