import api from "./api";

// get all orders
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// get single order
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// update order status
export const updateOrderStatus = async (id, orderStatus) => {
  const response = await api.patch(`/orders/${id}/status`, {
    orderStatus,
  });

  return response.data;
};