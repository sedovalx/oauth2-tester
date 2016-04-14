import React from 'react';
import PhaseType from 'props/PhaseType';
import PhaseItem from 'component/PhaseItem';

const PhaseList = ({phases, activePhase}) => (
    <div className="phase-list">
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {
                phases.map((p, idx) => <PhaseItem key={idx} phase={p} parentId="#accordion" isActive={idx === activePhase} />)
            }
        </div>
    </div>
);

PhaseList.propTypes = {
    phases: React.PropTypes.arrayOf(PhaseType).isRequired,
    activePhase: React.PropTypes.number
};

export default PhaseList;
