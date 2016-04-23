import React from 'react';
import classNames from 'classnames';
import SectionType from 'props/SectionType';

var SectionItem = React.createClass({
    getDefaultProps() {
        return {
            parentId: "#accordion",
            isActive: false
        };
    },
    render(){
        const section = this.props.section;
        const parentId = this.props.parentId;
        const isActive = this.props.isActive;
        return (
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id={"heading" + section.name}>
                    <h4 className="panel-title">
                        <a role="button"
                           className={classNames({'collapsed': !isActive})}
                           data-toggle="collapse" data-parent={parentId}
                           href={"#collapse" + section.name}
                           aria-expanded={isActive ? "true" : "false"}
                           aria-controls={"collapse" + section.name}>
                            {section.desc}
                        </a>
                    </h4>
                </div>
                <div id={"collapse" + section.name} className={classNames('panel-collapse', 'collapse', {'in': isActive})} role="tabpanel" aria-labelledby={"heading" + section.name}>
                    <div className="panel-body">
                        {this.props.children}
                    </div>

                </div>
            </div>
        )
    }  
});
SectionItem.propTypes = {
    parentId: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    section: React.PropTypes.shape(SectionType).isRequired
};

export default SectionItem;
