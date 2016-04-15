const commonState = {
    title: "OAuth 2.0 Tester",
    flows: [
        { name: "CODE_FLOW", desc: "Code flow" },
        { name: "RESOURCE_FLOW", desc: "Resource Owner Flow" },
        { name: "CLIENT_FLOW", desc: "Client Flow" }
    ]
};

export default function(state = commonState) {
    return state;
}