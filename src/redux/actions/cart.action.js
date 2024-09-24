export const setCart = (newCartItems) => {
  return {
    type: "SET_CART",
    payload: { myCart: newCartItems },
  };
};
export const addCart = (newCartItem) => {
  return {
    type: "ADD_CART",
    payload: newCartItem,
  };
};
export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
export const removeCartItem = (productId) => {
  return {
    type: "REMOVE_CART_ITEM",
    payload: productId,
  };
};
