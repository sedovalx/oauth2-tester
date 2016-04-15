import { connect } from 'react-redux';
import AppHeader from 'component/AppHeader';

const mapStateToProps = (state) => {
    return {
        title: state.commons.title
    };
};

const AppHeaderContainer = connect(
    mapStateToProps
)(AppHeader);

export default AppHeaderContainer;
