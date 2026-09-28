import api from "./api";

// get categories
export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// create category
export const createCategory = async (categoryData) => {
  const response = await api.post(
    "/categories",
    categoryData
  );

  return response.data;
};

// update category
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(
    `/categories/${id}`,
    categoryData
  );

  return response.data;
};

// delete category
export const deleteCategory = async (id) => {
  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;
};