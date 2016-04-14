import React from 'react';
import PhaseType from 'props/PhaseType';

const PhaseItem = ({phase, parentId, isActive}) => (
        <div className="panel panel-default">
            <div className="panel-heading" role="tab" id={"heading" + phase.name}>
                <h4 className="panel-title">
                    <a role="button"
                       className={isActive ? "" : "collapsed"}
                       data-toggle="collapse" data-parent={parentId}
                       href={"#collapse" + phase.name}
                       aria-expanded={isActive ? "true" : "false"}
                       aria-controls={"collapse" + phase.name}>
                        {phase.desc}
                    </a>
                </h4>
            </div>
            <div id={"collapse" + phase.name} className={"panel-collapse collapse" + (isActive ? " in" : "")} role="tabpanel" aria-labelledby={"heading" + phase.name}>
                <div className="panel-body">
                    {phase.desc}
                </div>

            </div>
        </div>
);

PhaseItem.propTypes = {
    phase: PhaseType.isRequired,
    parentId: React.PropTypes.string,
    isActive: React.PropTypes.bool
};


export default PhaseItem;
