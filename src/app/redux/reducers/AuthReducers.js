const initialState = {
     name: "",
     token: "",
     email: null,
     type: null,
};

const AuthReducers = (state = initialState, action) => {
     switch (action.type) {
          case "SAVE_AUTH":
               return {
                    ...state,
                    name: action.payload.name,
                    token: action.payload.token,
                    type: action.payload.type,
                    email: action.payload.email,
               };
          case "RESET_AUTH":
               return initialState;
          default:
               return state;
     }
};

export default AuthReducers;
