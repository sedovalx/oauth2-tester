import fetch from 'isomorphic-fetch'

export function fetchServers(limit) {
    let uri = '/api/servers';
    if (limit) {
        uri += `?limit=${limit}`;
    }
    return fetch(uri);
}

export function saveServer(server) {
    return fetch('/api/servers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(server)
    })
}

export function deleteServer(server) {
    return fetch(`/api/servers/${server.name}`, {
        method: 'DELETE'
    })
}

export function createDefaultServers() {
    return fetch('/api/servers/create-test-data', {
        method: 'POST'
    })
}

export function fetchSettings() {
    return fetch('/api/settings')
}

export function fetchUriCodeFlow(serverName, scope, state) {
    return fetch('/api/auth/build-uri/code', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serverName,
            scope,
            state
        })
    })
}