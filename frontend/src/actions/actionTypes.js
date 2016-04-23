import keyMirror from 'keymirror'

let types = keyMirror({
    DEFAULT_STATE: null,
    
    SERVER_MODAL_SHOW: null,
    SERVER_MODAL_CLOSE: null,

    SETTINGS_MODAL_SHOW: null,
    SETTINGS_MODAL_CLOSE: null,

    FETCH_SERVERS_START: null,
    FETCH_SERVERS_END: null,

    SAVE_SERVER_START: null,
    SAVE_SERVER_END: null,
    
    DELETE_SERVER_START: null,
    DELETE_SERVER_END: null,

    SERVER_SELECTED: null,
    
    FETCH_AUTH_URI_CODE_START: null,
    FETCH_AUTH_URI_CODE_END: null
});
types.INIT = "@@INIT";

export default types;
