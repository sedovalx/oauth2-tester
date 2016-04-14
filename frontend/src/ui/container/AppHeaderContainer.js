import { connect } from 'react-redux';
import AppHeader from 'component/AppHeader';

const mapStateToProps = (state) => {
    return {
        title: state.title,
        callbackUri: state.callbackUri
    };
};

const AppHeaderContainer = connect(
    mapStateToProps
)(AppHeader);

export default AppHeaderContainer;
