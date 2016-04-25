import keyMirror from 'keymirror'

let types = keyMirror({
    /** Notify with default store state */
    DEFAULT_STATE: null,

    /** Request to update the current flow type */
    CURRENT_FLOW_UPDATE: null,

    /** Asks server modal editor to open */
    SERVER_MODAL_SHOW: null,
    /** Asks server modal editor to close */
    SERVER_MODAL_CLOSE: null,

    /** Asks settings modal editor to open */
    SETTINGS_MODAL_SHOW: null,
    /** Asks settings modal editor to close */
    SETTINGS_MODAL_CLOSE: null,

    /** Notify that fetching of the servers data is about to start */
    FETCH_SERVERS_START: null,
    /** Notify that fetching of the servers data has completed */
    FETCH_SERVERS_END: null,

    /** Notify that saving of a server data is about to start */
    SAVE_SERVER_START: null,
    /** Notify that saving of a server data has completed */
    SAVE_SERVER_END: null,

    /** Notify that deleting of a server data is about to start */
    DELETE_SERVER_START: null,
    /** Notify that deleting of server data has completed */
    DELETE_SERVER_END: null,

    /** Notify that a server has been selected */
    SERVER_SELECTED: null,

    FETCH_AUTH_URI_CODE_START: null,
    FETCH_AUTH_URI_CODE_END: null,

    /** Notify that current request uri should be rebuilded */
    REQUEST_URI_REBUILD: null,

    /**  Local error occured */
    LOCAL_ERROR: null,
    /** Notify that error has been read by user */
    ERROR_HAS_BEEN_READ: null,

    REQUEST_DATA_CHANGED: null,
    
    EXCHANGE_REQUEST_START: null,
    EXCHANGE_REQUEST_END: null
});
types.INIT = "@@INIT";

export default types;
