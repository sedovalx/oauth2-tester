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
    servers: [
        {
            id: -1,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -2,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -3,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -4,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -5,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -6,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -7,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -8,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        },
        {
            id: -9,
            name: "GitHub.com",
            authEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
            clientID: "a586b75223a497c9e81f",
            clientSecret: "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
        }
    ],
    newServer: {
        id: null,
        name: "",
        desc: "",
        icon: "",
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