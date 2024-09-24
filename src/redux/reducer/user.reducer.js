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
        ...action.payload, // Combina las propiedades del payload directamente en el estado
      };
    case "CLEAR_USER": // Maneja la acción para limpiar el estado
      return initialUser; // Restablece el estado al inicial
    default:
      return state;
  }
}
