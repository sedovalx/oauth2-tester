import fetch from 'isomorphic-fetch'

export function fetchServers(limit) {
    let uri = '/api/servers';
    if (limit) {
        uri += `?limit=${limit}`;
    }
    return fetch(uri);
}
