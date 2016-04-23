import React from 'react'
import PhaseType from 'props/PhaseType'
import PhaseItem from 'component/PhaseItem'
import ServerListContainer from 'container/ServerListContainer'
import AuthApiInitializerContainer from 'container/AuthApiInitializerContainer'

const PhaseList = React.createClass({
    render(){
        const phases = this.props.phases;
        return (
            <div className="phase-list">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <PhaseItem key={phases.selectServer.name} phase={phases.selectServer} isActive={true}>
                        <div className="phase-item phase-select-server">
                            <ServerListContainer />
                            <AuthApiInitializerContainer />
                        </div>
                    </PhaseItem>
                    <PhaseItem key={phases.queryToken.name} phase={phases.queryToken}>
                        <div className="phase-item phase-query-token"></div>
                    </PhaseItem>
                    <PhaseItem key={phases.queryData.name} phase={phases.queryData}>
                        <div className="phase-item phase-query-data"></div>
                    </PhaseItem>
                </div>
            </div>
        );
    }
});
PhaseList.propTypes = {
    flows: React.PropTypes.arrayOf(React.PropTypes.shape({
        code: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired
    })).isRequired,
    phases: React.PropTypes.shape({
        selectServer: React.PropTypes.shape(PhaseType).isRequired,
        queryToken: React.PropTypes.shape(PhaseType).isRequired,
        queryData: React.PropTypes.shape(PhaseType).isRequired
    }).isRequired
};

export default PhaseList;
