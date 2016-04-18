import React from 'react'
import PhaseType from 'props/PhaseType'
import PhaseItem from 'component/PhaseItem'
import ServerListContainer from 'container/ServerListContainer'
import ServerEditorModalContainer from 'container/editors/ServerEditorModalContainer'

const PhaseList = React.createClass({
    render(){
        const phases = this.props.phases;
        const availablePhases = this.props.availablePhases;
        const flows = this.props.flows;
        const isPhaseAvailable = name => availablePhases.indexOf(name) >= 0;
        return (
            <div className="phase-list">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <ServerEditorModalContainer />
                    {isPhaseAvailable(phases.selectServer.name) && (
                        <PhaseItem key={phases.selectServer.name} phase={phases.selectServer} isActive={true}>
                            <div className="phase-item phase-select-server">
                                <ServerListContainer />
                            </div>
                        </PhaseItem>
                    )}
                    {isPhaseAvailable(phases.queryToken.name) && (
                        <PhaseItem key={phases.queryToken.name} phase={phases.queryToken}>
                            <div className="phase-item phase-query-token"></div>
                        </PhaseItem>
                    )}
                    {isPhaseAvailable(phases.queryData.name) && (
                        <PhaseItem key={phases.queryData.name} phase={phases.queryData}>
                            <div className="phase-item phase-query-data"></div>
                        </PhaseItem>
                    )}
                </div>
            </div>
        );
    }
});
PhaseList.propTypes = {
    flows: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired
    })).isRequired,
    availablePhases: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
    phases: React.PropTypes.shape({
        selectServer: React.PropTypes.shape(PhaseType).isRequired,
        queryToken: React.PropTypes.shape(PhaseType).isRequired,
        queryData: React.PropTypes.shape(PhaseType).isRequired
    }).isRequired
};

export default PhaseList;
