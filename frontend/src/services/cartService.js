import api from "./api";

// get logged-in user's cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// add product to cart
export const addToCart = async (cartData) => {
  const response = await api.post("/cart/add", cartData);
  return response.data;
};

// update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  const response = await api.put(`/cart/update/${itemId}`, {
    quantity,
  });

  return response.data;
};

// remove item from cart
export const removeFromCart = async (itemId) => {
  const response = await api.delete(`/cart/remove/${itemId}`);
  return response.data;
};

// clear complete cart
export const clearCart = async () => {
  const response = await api.delete("/cart/clear");
  return response.data;
};