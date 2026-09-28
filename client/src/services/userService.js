import api from "./api";

// get all users
export const getUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};

// get single user
export const getUserById = async (id) => {
  const response = await api.get(
    `/admin/users/${id}`
  );

  return response.data;
};

// block / unblock user
export const toggleBlockUser = async (id) => {
  const response = await api.patch(
    `/admin/users/${id}/block`
  );

  return response.data;
};

// delete user
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};