import { connect } from 'react-redux'
import { settingsModalShow } from 'actions/settingsModal'
import AppHeader from 'component/AppHeader'

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};

const mapDispatchToProps = dispatch => ({
    onSettingsClick: () => dispatch(settingsModalShow())
});

const AppHeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppHeader);

export default AppHeaderContainer;
