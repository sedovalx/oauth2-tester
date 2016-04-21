import keyMirror from 'keymirror';

let types = keyMirror({
    SERVER_MODAL_SHOW: null,
    SERVER_MODAL_CLOSE: null,

    SETTINGS_MODAL_SHOW: null,
    SETTINGS_MODAL_CLOSE: null,

    FETCH_SERVERS_START: null,
    FETCH_SERVERS_END: null,

    FETCH_SETTINGS_START: null,
    FETCH_SETTINGS_END: null,

    SAVE_SERVER_START: null,
    SAVE_SERVER_END: null,
    
    DELETE_SERVER_START: null,
    DELETE_SERVER_END: null,

    SERVER_SELECTED: null
});
types.INIT = "@@INIT";

export default types;
