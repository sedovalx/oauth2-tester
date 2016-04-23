import React from 'react'
import SectionType from 'props/SectionType'
import SectionItem from 'component/SectionItem'
import ServerListContainer from 'container/ServerListContainer'
import AuthApiInitializerContainer from 'container/AuthApiInitializerContainer'

const SectionList = React.createClass({
    render(){
        const sections = this.props.sections;
        return (
            <div className="section-list">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <SectionItem key={sections.selectServer.name} section={sections.selectServer} isActive={true}>
                        <div className="section-item section-select-server">
                            <ServerListContainer />
                            <AuthApiInitializerContainer />
                        </div>
                    </SectionItem>
                    <SectionItem key={sections.queryToken.name} section={sections.queryToken}>
                        <div className="section-item section-query-token"></div>
                    </SectionItem>
                    <SectionItem key={sections.queryData.name} section={sections.queryData}>
                        <div className="section-item section-query-data"></div>
                    </SectionItem>
                </div>
            </div>
        );
    }
});
SectionList.propTypes = {
    sections: React.PropTypes.shape({
        selectServer: React.PropTypes.shape(SectionType).isRequired,
        queryToken: React.PropTypes.shape(SectionType).isRequired,
        queryData: React.PropTypes.shape(SectionType).isRequired
    }).isRequired
};

export default SectionList;
