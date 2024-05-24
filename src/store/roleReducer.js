// roleReducer.js
const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROLES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ROLES_SUCCESS":
      return { ...state, loading: false, roles: action.payload };
    case "FETCH_ROLES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default roleReducer;
