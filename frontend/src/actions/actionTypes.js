import keyMirror from 'keymirror';

let types = keyMirror({
    SERVER_MODAL_SHOW: null,
    SERVER_MODAL_CLOSE: null,

    FETCH_SERVERS_START: null,
    FETCH_SERVERS_END: null,

    SAVE_SERVER_START: null,
    SAVE_SERVER_END: null,
    
    DELETE_SERVER_START: null,
    DELETE_SERVER_END: null
});
types.INIT = "@@INIT";

export default types;
