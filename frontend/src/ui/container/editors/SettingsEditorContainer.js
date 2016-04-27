import { reduxForm }            from 'redux-form'

import { settingsModalClose }   from '/actions/settingsModal'
import SettingsEditor           from '/component/editors/SettingsEditor'
import validateSettings         from '/validation/settings'

const mapStateToProps = state => ({
    initialValues: {
        currentFlowStr: JSON.stringify(state.current.flow),
        username: state.current.auth.username || "",
        password: state.current.auth.password || ""
    },
    flows: state.refs.flows.items,
    callbackUri: state.settings.callbackUri
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
