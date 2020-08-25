const { AUTH } = require("../store/constant");

const initialState = {
    name: "",
    token: "",
    type: null,
    authLoading: true,
};

const AuthReducers = (state = initialState, action) => {
    switch (action.type) {
        case `${AUTH}_PENDING`:
            return initialState;
        case `${AUTH}_FULFILLED`:
            return {
                ...state,
                authLoading: false,
                name: action.payload.name,
                token: action.payload.token,
                type: action.payload.type,
            };
        default:
            return state;
    }
};

export default AuthReducers;
