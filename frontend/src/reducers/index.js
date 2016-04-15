const initialState = {
    title: "OAuth 2.0 Tester",
    phases: {
        selectServer: {
            name: "SELECT_SERVER",
            desc: "1. Add or select existing OAuth 2.0 server",
            selected: null,
            flow: "CODE_FLOW"
        },
        queryToken: {
            name: "QUERY_TOKEN",
            desc: "2. Get authorization code and exchange it for tokens",
            authCode: "",
            authToken: "",
            refreshToken: ""
        },
        queryData: {
            name: "QUERY_DATA",
            desc: "3. Make a request to the API"
        }
    },
    callbackUri: `${location.origin}/api/oauth/callback`,
    servers: [],
    newServer: {
        id: null,
        name: "",
        authEndpoint: "",
        tokenEndpoint: "",
        clientID: "",
        clientSecret: ""
    },
    flows: [
        { name: "CODE_FLOW", desc: "Code flow" },
        { name: "RESOURCE_FLOW", desc: "Resource Owner Flow" },
        { name: "CLIENT_FLOW", desc: "Client Flow" }
    ],
    availablePhases: ["SELECT_SERVER"],
    exchange: {
        log: []
    }
};

export default function index(state = initialState, action) {
    return state;
}