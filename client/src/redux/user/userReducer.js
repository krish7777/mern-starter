const INITIAL_STATE = {
  currentUser: null,
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default userReducer;
