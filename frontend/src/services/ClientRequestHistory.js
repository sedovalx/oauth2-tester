import store from 'store'
import Request from '/rest/Request'

const lastRequestKey = 'last-auth-request';

export function storeRequest(request) {
    store.set(lastRequestKey, request);
}

export function restoreRequest() {
    const restored = store.get(lastRequestKey);
    // store.remove(lastRequestKey);
    if (restored) {
        return new Request(restored);
    } else {
        return null;
    }
}


