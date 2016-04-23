const defaultState = {
    selectServer: {
        name: "SELECT_SERVER",
        desc: "1. Add new or select existing OAuth 2.0 server"
    },
    queryToken: {
        name: "QUERY_TOKEN",
        desc: "2. Get authorization code and exchange it for tokens"
    },
    queryData: {
        name: "QUERY_DATA",
        desc: "3. Make a request to the API"
    }
};

export default function(state = defaultState){
    return state;
}