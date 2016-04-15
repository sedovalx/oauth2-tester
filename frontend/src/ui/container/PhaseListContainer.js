import { connect } from 'react-redux';
import PhaseList from 'component/PhaseList';

const mapStateToProps = (state) => {
    return {
        phases: state.phases,
        availablePhases: state.availablePhases,
        flows: state.commons.flows
    }
};

const PhaseListContainer = connect(
    mapStateToProps
)(PhaseList);

export default PhaseListContainer;
