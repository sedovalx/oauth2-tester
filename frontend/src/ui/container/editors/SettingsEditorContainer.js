import { reduxForm } from 'redux-form'
import SettingsEditor from 'component/editors/SettingsEditor'
import { settingsModalClose } from 'actions/settingsModal'
import validateSettings from 'validation/settings'

const mapStateToProps = state => ({
    initialValues: {
        currentFlow: state.settings.flows.current,
        username: state.settings.credentials.username,
        password: state.settings.credentials.password,
        callbackUri: state.settings.callbackUri
    },
    flows: state.settings.flows.items
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(settingsModalClose()),
    onSubmit: (fields) => {
        console.log(fields);
    }
});

export default reduxForm({
        form: 'settings-editor',
        fields: ['currentFlow', 'username', 'password', 'callbackUri']
    },
    mapStateToProps,
    mapDispatchToProps
)(SettingsEditor)
