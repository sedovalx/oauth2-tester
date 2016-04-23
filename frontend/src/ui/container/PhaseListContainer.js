import { connect } from 'react-redux';
import PhaseList from 'component/PhaseList';

const mapStateToProps = (state) => {
    return {
        phases: state.phases,
        flows: state.settings.flows.items
    }
};

const PhaseListContainer = connect(
    mapStateToProps
)(PhaseList);

export default PhaseListContainer;
