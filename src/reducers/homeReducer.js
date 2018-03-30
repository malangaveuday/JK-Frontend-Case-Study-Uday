import { CHARCTER_STRING, KEYS_COUNT, KEYS_STORE } from '../actions/type';

const INITIAL_STATE = {
    inputString: '',
    stringCount: 5,
    keysStore: []
};

export default((state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHARCTER_STRING:
            return { ...state, inputString: action.payload };
            break;
        case KEYS_COUNT:
            return { ...state, stringCount: action.payload };
            break;
        case KEYS_STORE:
            return { ...state, keysStore: action.payload };
            break;
        default:
            return state;
            break;
    }
});