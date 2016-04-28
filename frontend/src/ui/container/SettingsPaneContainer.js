import { connect }              from 'react-redux'
import { createSelector }       from 'reselect'
import { settingsModalShow }    from '/actions/settingsModal'
import SettingsPane             from '/component/SettingsPane'

const getCurrentFlow = createSelector([state => state.current.flow], _ => _);

const mapStateToProps = (state) => {
    return {
        flow: getCurrentFlow(state)
    };
};

const mapDispatchToProps = dispatch => ({
    onSettingsClick: () => dispatch(settingsModalShow())
});

const SettingsPaneContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPane);

export default SettingsPaneContainer;
