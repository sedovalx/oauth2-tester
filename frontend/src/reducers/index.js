const initialState = {
    title: "OAuth 2.0 Tester",
    phases: {
        selectServer: {
            name: "SELECT_SERVER",
            desc: "1. Выберите OAuth 2.0 сервер. Можно добавить свой.",
            selected: null,
            flow: "CODE_FLOW"
        },
        queryToken: {
            name: "QUERY_TOKEN",
            desc: "2. Запустите процесс получения токена для доступа к ресурсам.",
            authCode: "",
            authToken: "",
            refreshToken: ""
        },
        queryData: {
            name: "QUERY_DATA",
            desc: "3. Выполните запрос к API сервера ресурсов, используя полученный токен."
        }
    },
    callbackUri: `${location.origin}/api/oauth/callback`,
    servers: [],
    newServer: {
        id: null,
        name: "",
        desc: "",
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