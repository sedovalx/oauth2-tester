import React from 'react';
import PhaseType from 'props/PhaseType';
import PhaseItem from 'component/PhaseItem';

const PhaseList = ({phases, activePhase}) => (
    <div className="phase-list">
        {phases.map(p => <PhaseItem phase={p} />)}
    </div>
);

PhaseList.propTypes = {
    phases: React.PropTypes.arrayOf(PhaseType).isRequired,
    activePhase: PhaseType
};

export default PhaseList;
