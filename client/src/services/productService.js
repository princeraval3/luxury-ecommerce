import api from "./api";

// get all products
export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

// search products
export const searchProducts = async (query) => {
  const response = await api.get(
    `/products/search?q=${encodeURIComponent(query)}`
  );

  return response.data;
};

// create product
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// update product
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

// get single product
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};