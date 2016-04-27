import { reduxForm }        from 'redux-form'

import { serverModalClose } from '/actions/serverModal'
import asyncApiSaveServer   from '/actions/asyncApiSaveServer'
import ServerEditor         from '/component/editors/ServerEditor'
import validateServer       from '/validation/server'

const mapStateToProps = state => {
    const server = state.current.server;
    const initialValues = {};
    // отфильтровываем пустые свойства, на них ругаются инпуты в redux-form
    if (server) {
        Object.keys(server).forEach(key => {
            if (server[key] != null){
                initialValues[key] = server[key];
            }
        });
    }
    return {
        initialValues
    };
};

const mapDispatchToProps = dispatch => ({
    onCancel: function(){
        return dispatch(serverModalClose());
    },
    onSubmit: (fields) => {
        return validateServer(fields)
            .then(() => dispatch(asyncApiSaveServer(fields)))
            .then(() => dispatch(serverModalClose()))
            .catch(err => Promise.reject(err instanceof Error ? { _error: err.message } : err));
    }
});

export default reduxForm({
        form: 'server-editor',
        fields: ['name', 'authEndpoint', 'tokenEndpoint', 'clientID', 'clientSecret', 'authCode', 'authToken']
    },
    mapStateToProps,
    mapDispatchToProps
)(ServerEditor)
