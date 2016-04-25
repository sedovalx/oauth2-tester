import store from 'store'

const lastRequestKey = 'last-auth-request';

export function storeRequest(request) {
    store.set(lastRequestKey, request);
}

export function restoreRequest() {
    const request = store.get(lastRequestKey);
    store.remove(lastRequestKey);
    return request;
}


