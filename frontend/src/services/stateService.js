import { Base64 } from 'js-base64'

export function serializeState(currentState) {
    const json = {
        server: currentState.server ? currentState.server.name : null,
        flow: currentState.flow ? currentState.flow.code : null,
        auth: {
            code: currentState.auth.code,
            token: currentState.auth.token
        }
    };

    return Base64.encode(JSON.stringify(json));
}

export function deserializeState(str) {
    if (str) {
        return JSON.parse(Base64.decode(str));
    }
    return str;
}
