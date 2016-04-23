import { connect } from 'react-redux';
import SectionList from 'component/SectionList';

const mapStateToProps = (state) => {
    return {
        sections: state.refs.sections
    }
};

const SectionListContainer = connect(
    mapStateToProps
)(SectionList);

export default SectionListContainer;
