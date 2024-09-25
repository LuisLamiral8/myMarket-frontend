const cartFromStorage = JSON.parse(localStorage.getItem("cart"));

export const initialUser = {
  myCart: cartFromStorage || [],
};

export function cartReducer(state = initialUser, action) {
  switch (action.type) {
    case "SET_CART":
      const updatedCartSet = { ...state, myCart: action.payload.myCart };
      localStorage.setItem("cart", JSON.stringify(updatedCartSet.myCart));
      return updatedCartSet;

    case "ADD_CART":
      const updatedCartAdd = {
        ...state,
        myCart: [...state.myCart, action.payload],
      };
      localStorage.setItem("cart", JSON.stringify(updatedCartAdd.myCart));
      return updatedCartAdd;

    case "REMOVE_CART_ITEM":
      const updatedCartRemove = {
        ...state,
        myCart: state.myCart.filter(
          (item) => item.identifier !== action.payload
        ),
      };
      localStorage.setItem("cart", JSON.stringify(updatedCartRemove.myCart));
      return updatedCartRemove;

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return initialUser;

    default:
      return state;
  }
}
