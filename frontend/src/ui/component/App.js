import React from 'react';
import AppHeader from 'component/AppHeader';
import PhaseListContainer from 'container/PhaseListContainer';

class App extends React.Component {
    render() {
        return (
            <div>
                <AppHeader title="OAuth 2.0 Tester" />
                <div className="app-main container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <PhaseListContainer />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;
