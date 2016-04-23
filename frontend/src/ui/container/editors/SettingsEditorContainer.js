import { reduxForm } from 'redux-form'
import SettingsEditor from 'component/editors/SettingsEditor'
import { settingsModalClose } from 'actions/settingsModal'
import validateSettings from 'validation/settings'

const mapStateToProps = state => ({
    initialValues: {
        currentFlowStr: JSON.stringify(state.settings.flows.current),
        username: state.settings.credentials.username || "",
        password: state.settings.credentials.password || ""
    },
    callbackUri: state.settings.callbackUri,
    flows: state.refs.flows.items
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(settingsModalClose()),
    onSubmit: (fields) => {
        fields.currentFlow = JSON.parse(fields.currentFlowStr);
        delete fields.currentFlowStr;
        return validateSettings(fields)
            .then(() => dispatch(settingsModalClose(fields)))
            .catch(err => {
                throw err;
            })
    }
});

export default reduxForm({
        form: 'settings-editor',
        fields: ['currentFlowStr', 'username', 'password', 'callbackUri']
    },
    mapStateToProps,
    mapDispatchToProps
)(SettingsEditor)
