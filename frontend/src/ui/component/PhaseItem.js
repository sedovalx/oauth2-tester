import React from 'react';
import PhaseType from 'props/PhaseType';

const PhaseItem = ({phase}) => (
    <div className="phase-item">
        {phase.name}
    </div>
);

PhaseItem.propTypes = {
    phase: PhaseType.isRequired
};

export default PhaseItem;
