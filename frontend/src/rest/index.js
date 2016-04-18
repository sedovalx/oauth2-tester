import fetch from 'isomorphic-fetch'

export function fetchServers(limit) {
    let uri = '/api/servers';
    if (limit) {
        uri += `?limit=${limit}`;
    }
    return fetch(uri);
}

export function createServer(server) {
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
    return fetch(`/api/servers/${server.id}`, {
        method: 'DELETE'
    })
}

export function editServer(server) {
    return fetch(`/api/servers/${server.id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: server.name,
            authEndpoint: server.authEndpoint,
            tokenEndpoint: server.tokenEndpoint,
            clientID: server.clientID,
            clientSecret: server.clientSecret
        })
    })
}

export function createDefaultServers() {
    return fetch('/api/servers/default', {
        method: 'POST'
    })
}
