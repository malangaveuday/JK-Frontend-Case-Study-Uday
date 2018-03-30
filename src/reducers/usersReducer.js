import { STORE_USER } from '../actions/type';

const INITIAL_STATE = {
    allUsers: []
};

export default((state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_USER:
            return { ...state, allUsers: action.payload };
            break;
        default:
            return state;
            break;
    }
});