export const initialUser = {
  id: null,
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  country: "",
  dni: "",
  role: "",
};

export function userReducer(state = initialUser, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_USER":
      return initialUser;
    default:
      return state;
  }
}
