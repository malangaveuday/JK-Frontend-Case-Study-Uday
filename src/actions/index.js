import { CHARCTER_STRING, KEYS_COUNT,KEYS_STORE, STORE_USER } from './type';

const updateCharcterString = (payload) => {
    return {
        type: CHARCTER_STRING,
        payload
    };
};

const updateKeysCount = (payload) => {
    return {
        type: KEYS_COUNT,
        payload
    };
};

const updateKeysStore = (payload) => {
    return {
        type: KEYS_STORE,
        payload
    };
};

const storeUsers = (payload) => {
    return {
        type: STORE_USER,
        payload
    };
};

export { updateCharcterString, updateKeysCount, updateKeysStore, storeUsers };