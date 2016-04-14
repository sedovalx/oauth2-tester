import React from 'react';
import PhaseItem from 'component/PhaseItem';

const PhaseList = ({phases, availablePhases, flows}) => (
    <div className="phase-list">
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <PhaseItem key={phases.selectServer.name} phase={phases.selectServer}
            {
                phases.map((p, idx) => <PhaseItem key={idx} phase={p} parentId="#accordion" isActive={idx === activePhase} />)
            }
        </div>
    </div>
);

export default PhaseList;
