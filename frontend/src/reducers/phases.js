let phasesState = {
    selectServer: {
        name: "SELECT_SERVER",
        desc: "1. Add new or select existing OAuth 2.0 server",
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
};

export default function(state = phasesState){
    return state;
}