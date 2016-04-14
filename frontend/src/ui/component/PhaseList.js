import React from 'react';
import PhaseType from 'props/PhaseType';
import PhaseItem from 'component/PhaseItem';

const PhaseList = React.createClass({
    render(){
        const phases = this.props.phases;
        const availablePhases = this.props.availablePhases;
        const flows = this.props.flows;
        return (
            <div className="phase-list">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <PhaseItem key={phases.selectServer.name} phase={phases.selectServer} isActive={availablePhases.includes(phases.selectServer.name)}>
                        <div className="phase-item phase-select-server"></div>
                    </PhaseItem>
                    <PhaseItem key={phases.queryToken.name} phase={phases.queryToken} isActive={availablePhases.includes(phases.queryToken.name)}>
                        <div className="phase-item phase-query-token"></div>
                    </PhaseItem>
                    <PhaseItem key={phases.queryData.name} phase={phases.queryData} isActive={availablePhases.includes(phases.queryData.name)}>
                        <div className="phase-item phase-query-data"></div>
                    </PhaseItem>
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
