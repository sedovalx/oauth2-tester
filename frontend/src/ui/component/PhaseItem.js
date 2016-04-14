import React from 'react';

var PhaseItem = React.createClass({
    getDefaultProps() {
        return {
            parentId: "#accordion",
            isActive: false
        };
    },
    render(){
        const phase = this.props.phase;
        const parentId = this.props.parentId;
        const isActive = this.props.isActive;
        return (
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
                        {this.props.children}
                    </div>

                </div>
            </div>
        )
    }
});
PhaseItem.propTypes = {
    parentId: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    phase: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired
    }).isRequired
};

export default PhaseItem;
