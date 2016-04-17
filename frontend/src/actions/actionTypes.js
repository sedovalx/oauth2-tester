import keyMirror from 'keymirror';

let types = keyMirror({
    ADD_SERVER_MODAL_SHOW: null,
    ADD_SERVER_MODAL_CANCEL: null,
    ADD_SERVER_MODAL_ACCEPT: null,

    REQUEST_SERVERS_START: null,
    REQUEST_SERVERS_END: null,

    SAVE_SERVER_START: null,
    SAVE_SERVER_END: null
});
types.INIT = "@@INIT";

export default types;
