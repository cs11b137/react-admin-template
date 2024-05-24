import { getUsersApi } from "../services/api";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });

  try {
    const response = await getUsersApi();
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
  }
};
